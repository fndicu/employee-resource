const  mongoose = require("mongoose");
const Employee = require("./models/employee");
const Skill = require("./models/skill");
const Task = require('./models/task');

const data = [
    {
        name: "Francis Ndicu",
        title: "Implementation Specialist",
        image: "https://cdn2.hubspot.net/hubfs/2271693/photo_1%20(2).jpg",
        description: "This is a quick description"
     },
    {
        name: "Francis Wanderi",
        title: "Channel Account Specialist",
        image: "https://cdn2.hubspot.net/hubfs/2271693/photo_1%20(2).jpg",
        description: "This is a quick description"
    },
    {
        name: "Frank Ndicu",
        title: "Support Engineer",
        image: "https://cdn2.hubspot.net/hubfs/2271693/photo_1%20(2).jpg",
        description: "This is a quick description"
    }
]
const seedDB = () => {
    //remove all employees
    Employee.remove({}, (err) => {
        if (err) {
            console.log(err)   
        }
        console.log('removed employees')
        //add a few new employees 
        data.forEach(function (seed) {
            Employee.create(seed, function (err, employee) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('added an Employee');
                    //create a skill
                    Skill.create(
                        {
                            communication: 10,
                            productKnowledge: 9
                    },  function(err, skill){
                        if(err){
                            console.log(err)
                        } else {
                            employee.skills.push(skill);
                            employee.save();
                            console.log("created new skill")
                        }
                    //create task
                    Task.create(
                        {
                            name: 'test',
                            description: 'test'
                    }, function(err, task){
                        if(err){
                            console.log(err)
                        } else{
                            employee.tasks.push(task);
                            employee.save();
                            console.log('created new task')
                        }
                    }
                
                )
                 });
                }
            });
        });
    });
}





//add a few new skills




module.exports = seedDB;