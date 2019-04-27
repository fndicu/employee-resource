const mongoose = require('mongoose');

// Employee SCHEMA Set-up
const employeeSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
    description: String,
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill"
        }
    ],
    tasks: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Task"
        }
    ]
});

//building the Employee model 
module.exports = mongoose.model("Employee", employeeSchema);
