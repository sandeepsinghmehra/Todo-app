const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    item:{
        type:String,
        required: [true, "This item is required"],
        uppercase: true  
    }
},{timestamps:true});
const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;