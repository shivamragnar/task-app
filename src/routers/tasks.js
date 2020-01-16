const express = require('express')
const Tasks = require('../models/tasks')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    // const task = new Tasks(req.body)

    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    
    
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})


//GET /tasks?completed=true
//GET /tasks?limit=2&skip=2
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {

    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        let parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // let tasks = await Tasks.find({'owner' : req.user._id})
        // res.send(tasks)

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()        
    }
   
    // Tasks.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req,res) => {
    let _id = req.params.id

    try {
        // let task = await Tasks.findById(_id)

        let task = await Tasks.findOne({_id, 'owner': req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send()        
    }
    
    // Tasks.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    let updates = Object.keys(req.body)
    let allowedUpdates = ["description", "completed"]
    let isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send('Invalid update request')
    }

    try {
         // let task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // let task = await Tasks.findById(req.params.id)

        let task = await Tasks.findOne({_id: req.params.id, owner: req.user._id})

        if(!task){
            res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {

    try {

        // let task = await Tasks.findByIdAndDelete(req.params.id)
        let task = await Tasks.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router