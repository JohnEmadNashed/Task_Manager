const express = require('express');
const app = express() ;
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');


//Load in the Mongoose Models
const { List,Task }= require('./db/models');

//Load Middleware
app.use(bodyParser.json());

//CORS Headers Middleware
app.use( (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    res.setHeader("Access-Control-Allow-Headers" , "Origin, X-Requested-with, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PATCH, PUT, OPTIONS");
    next();
  });

/* ROUTE HANDLERS*/

/*LIST ROUTES*/
app.get( '/lists' , (req , res) => {
    
    //we want to return an array of all the lists in the database
    List.find({}).then((lists)=> {
        res.send(lists);
    }) 
});

app.post('/lists', (req , res) => {

    //we want to create a new list and return the new list documents back to the user (which includes the id)
    let title = req.body.title;
    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    });

});

//Update a specified list
app.patch('/lists/:id' , (req , res) => {
    
    //we want to update the list with new values specified in the JSON body 
    List.findOneAndUpdate({ _id:req.params.id } , {
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    });

});

app.delete('/lists/:id' , (req , res) => {
    
    //delete the specified list
    List.findOneAndRemove({_id: req.params.id})
    .then((removedListDoc) => {
        res.send(removedListDoc);
    })
    ; 
    
});

/*Task ROUTES*/
app.get('/lists/:listId/tasks' , (req,res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks)=> {
        res.send(tasks);
    }) 
});

app.post('/lists/:listId/tasks', (req , res) => {

    //we want to create a new task and return the new task documents back to the user (which includes the id)
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newtaskDoc) => {
        res.send(newtaskDoc);
    })

})
//Update a specified task
app.patch('/lists/:listId/tasks/:taskId' , (req , res) => {
    
    //we want to update the task with new values specified in the JSON body 
    Task.findOneAndUpdate({ 
        _id: req.params.taskId,
        _listId: req.params.listId

    }, {
        $set: req.body
        }).then(() => {
        res.sendStatus(200)
    });

});

app.delete('/lists/:listId/tasks/:taskId' , (req , res) => {
    
    //delete the specified list
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});

app.listen(3000,() => {
    console.log("Server is listening on port 3000");
});


