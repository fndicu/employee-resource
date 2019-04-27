const mongoose = require('mongoose');

//Task SCHEMA set-up
const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
});

//building the Task model
module.exports = mongoose.model('Task', taskSchema);