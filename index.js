const express = require('express');
const mongoose = require("mongoose")
require('dotenv').config()

const app = express();

const Task = require("./model/Task")

app.use(express.json())

const PORT = process.env.PORT || 5000;

// temp database 
let tasks = []

// const DB = process.env.MONGODB_URI;


mongoose.connect(process.env.MONGODB_URI,()=>{
    console.log("connected to mongodb database....")
})
// console.log(DB);

// Create a task 
app.post('/tasks',async(req,res) =>{
    // const task ={
    //     'id': req.body.id,
    //     'title': req.body.title,
    //     'description': req.body.description,
    //     'priority': req.body.priority,
    //     'emoji': req.body.emoji
    // }

    // tasks.push(task)

    // res.json({
    //     'status':'success',
    //     'message':'task added successfully',
    //     'data':task
    // })

    // mongo db 

    const task = new Task({
        id : req.body.id,
        title: req.body.title,
        description:req.body.description,
        priority:req.body.priority,
        emoji:req.body.emoji, 
    })

    const savedTask = await task.save();

res.json({
    'status':'success',
    data : savedTask
})

});

// to read all task
app.get('/tasks',async(req,res)=>{

    const alltasks = await Task.find();

   res.json({
    'status':'success',
    'data':tasks
   }) 
})

// read specific task 

app.post('/tasks',async(req,res)=>{
    const id = req.body.id;

    const specificTask = await Task.findOne({id:id});

    // tasks.map((task) =>{
    //     if(task.id === id){
    //      resultTask = task;
    //     }
    // })

    res.json({
        'status':'sucess',
        'data':specificTask,
    })
})


// app.get('/health',(req,res)=>{
//    res.json({
//     "status": "API is ruuning well "
//    }) 
// })

// delete all 

app.post('/delete_task',async(req,res)=>{
    // tasks = []

    const result = await Task.deleteMany();
    res.json({
        status:'success',
        // 'data':tasks
        data :result

    })
})

// delete soecific task by id 

app.post('/delete_task',async(req,res)=>{
    const id = req.body.id;

    const result = await Task.deleteOne({id:id});

    // let index = -1 ;

    // tasks.map((task,i)=>{
    //     if(id===task.id)
    //     {
    //         index = i;

    //     }
    // })

    // tasks.splice(index,1)

    res.json({
        'status':'success',
        'data':tasks
    })
})

app.post('/update_task',async(req,res)=>{

    const id = req.body.id;
    const title= req.body.title;
    const description= req.body.description;
    const priority= req.body.priority;
    const emoji= req.body.emoji;


    const updateResult = await Task.updateOne({id:id},{
        $set: {
            title:title,
            description:description,
            priority:priority,
            emoji:emoji,
        }
    })

    // let index = -1 ;

    // tasks.map((task,i)=>{
    //     if(id===task.id)
    //     {
    //         index = i;

    //     }
    // })

    // tasks[index] ={
    //     id :id,
    //     title:title,
    //     description:description,
    //     priority:priority,
    //     emoji:emoji,
    // }

        res.json({
            'status':'success',
            'data':req.body.data,
        })
    
})


app.listen(PORT,()=>{
console.log('wow! server started euunning port',PORT);
})