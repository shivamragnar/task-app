//CRUD operations - create, read, update, delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID 

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'



MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client) => {
    if(error){
        return console.log('Could not connect to the database :(')
    }
    const db = client.db('task-manager')
    // db.collection('users').insertOne({
    //     _id : id,
    //     name: 'Arun',
    //     age: 23
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // }) 
    
    // db.collection('users').insertMany([
    //     {
    //         name: 'Nischal',
    //         age: 23
    //     },
    //     {
    //         name: 'Awdhesh',
    //         age: 23
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: "I have to wake up in the morning at 8 0' clock.",
    //         completed: false
    //     },
    //     {
    //         description: "Study Node.js programming at night.",
    //         completed: true
    //     },
    //     {
    //         description: "Finish ProfileAPI tasks at the earliest.",
    //         completed: false
    //     }
    // ], (error, result) => {
    //         if(error){
    //             return console.log('Unable to insert documents')
    //         }
    //         console.log(result.ops)  
    // })

    // db.collection('users').findOne({'name' : 'Shivam'}, (error, result) => {
    //     if(error){
    //         return console.log('Unable to fetch user')
    //     }
    //     console.log(result)
    // })


    // db.collection('users').find({age : 23}).toArray((error, users) => {
    //     if(error){
    //         return console.log('Unable to fetch user')
    //     }
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({_id : new ObjectID("5d965424309c2754a22f7609")}, (error, result) => {
    //     if(error){
    //         return console.log('Unable to find task')
    //     }
    //     console.log(result)
    // })    

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     if(error){
    //         return console.log('Unable to fetch tasks')
    //     }
    //     console.log(tasks)
    // })


    // db.collection('users').updateOne({
    //     _id : new ObjectID("5d9651d7f62f7153a84a7c05")
    // }, {
    //     $set : {
    //         name : 'Raysk'
    //     },
    //     $inc : {
    //         age : 1
    //     }
    // })
    // .then(res => console.log(res))
    // .catch(er => console.log(er))


    // db.collection('tasks').updateMany({
    //     completed : false
    // }, {
    //     $set : {
    //         completed : true
    //     }
    // })
    // .then(res => console.log(res))
    // .catch(er => console.log(er))


    // db.collection('users').deleteMany({
    //     age : 25
    // })
    // .then(res => console.log(res))
    // .catch(er => console.log(er))

    // db.collection('tasks').deleteOne({
    //     description : "I have to wake up in the morning at 8 0' clock."
    // })
    // .then(res => console.log(res))
    // .catch(er => console.log(er))
})
