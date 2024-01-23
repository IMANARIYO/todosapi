const mongoose = require('mongoose');
console.log("gettingtodos--------")
// Define Todo Schema
const todoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

// Create Todo model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
