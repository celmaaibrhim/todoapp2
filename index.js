

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const mongodb = require('mongodb');

var url = "mongodb+srv://todolist:1234@cluster0.h0itp.mongodb.net/todolistDB";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const Schema = new mongoose.Schema({
    todos: String
})

const Model =  new mongoose.model('todo', Schema)

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));


app.get('/', (req,res)=>{
    Model.find({}, function (err, docs) {
    if (err) throw err;
        res.render('index', {"target": docs})
})
})
app.post('/add', (req,res)=>{
    var { todo } = req.body;
   var newToDo = new Model({
todos: todo })
   newToDo.save();
   res.redirect('/');
})

app.get('/remove/:id', (req, res) => {
const id = req.params.id;
   
Model.findByIdAndRemove(id, function (err, docs) {
        if (err) throw err;
        res.redirect('/')
    })

})



app.listen(port, ()=>{console.log('server is up and running on ' + port)})
