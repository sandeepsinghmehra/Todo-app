const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Todo = require('./models/todoData');

const app = express();
const port = process.env | 3030 ;
const dbUrL = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(dbUrL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    console.log("successfully connected Mongodb");
    app.listen(port, (req, res)=>{
        console.log('Server connecting port :'+ port);
    })
})
.catch((err)=>console.log(err));

//view engine
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended : true }));
app.get('/', (req, res)=>{
    res.redirect('/todo');
});

app.get('/todo', (req, res)=>{
    Todo.find()
        .then((result)=>{
              res.render('todoIndex', {todos: result});
            })
            .catch((err)=>{console.log(err)});
});

app.post('/todo', (req, res)=>{
    const todo = new Todo(req.body);
    console.log('this is post todo data: '+ todo.item)
    todo.save()
            .then((result)=>{
                res.redirect('/todo');
            })
            .catch((error)=>{
                console.log(error + " Your Todo Data is not saved, it's an error Please solve this error.");
            })
});


app.delete('/todo/:id', (req, res) => {
   Todo.findByIdAndDelete(req.params.id)
     .then((result) =>{
         res.json({redirect:'/todo'});
        })
     .catch((err)=>{console.log(err);
    });
   });
