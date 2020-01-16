const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Tasks = require('./tasks')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },
    email : {
        type: String,
        required : true,
        unique: true,
        trim : true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not valid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 7, 
        validate(value){
            if(value.includes('password')){
                throw new Error('Password should not contain the word password')
            }
        }
    },  
    age : {
        type : Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive integer')
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
}, {
    timestamps: true
})


userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({'_id' : user._id.toString() }, 'jwtPassPhrase')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}


// Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Delete all the tasks of the user before removing the user
userSchema.pre('remove', async function(next){
    const user = this
    Tasks.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User