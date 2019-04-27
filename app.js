const express    =  require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const passport  = require('passport');
const LocalStrategy = require('passport-local');
const Employee = require("./models/employee");
const Skill =   require('./models/skill');
const Task = require('./models/task');
const User = require('./models/user');
const seedDB = require('./seeds.js');

seedDB();

mongoose.connect("mongodb://localhost/employee_insights");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')
app.use(express.static(__dirname +'/public'));

//Routes 

//Show landing page
app.get('/', (req, res) => {
    res.render('landing')
});

//Show all employees 
app.get('/employees', (req, res) => {
    Employee.find({}, (err, allEmployees) => {
        if(err){
            console.log(err);
        } else{
            res.render("employees/index", {employees: allEmployees});
        }
    });
});

//Create a new Employee
app.post('/employees', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    Employee.create({name: name, image: image, description: description}, (err, employee) => {
        if(err){
            console.log(err);
        }else{
                res.redirect('/employees')
        }
    });
});

//Form to create a new Employee 
app.get('/employees/new', (req, res) => {
    res.render('employee/new')
});

//Find an Employee by ID
app.get('/employees/:id', (req, res) => {
    let id = req.params.id;
    Employee.findById(id).populate("skills").exec((err, employee) => {
        if(err){
            console.log(err);
        } else{
            res.render('employees/Show', {employee: employee})
        }
    });
});

//=================/
//Skills Routes
//=================/
app.get('/employees/:id/skills/new', (req, res) => {
    Employee.findById(req.params.id, (err,employee) =>{
        if (err) {
            console.log(err)
        } else {
            res.render('skills/new.ejs', {employee: employee})   
        }
    });
});

app.post('/employees/:id/skills', (req,res) =>{
    Employee.findById(req.params.id, (err, employee) =>{
        if(err){
            console.log(err)
            res.redirect('/employees');
        } else{
            Skill.create(req.body.skill, (err, skill) =>{
                if(err){
                    console.log(err)
                } else {
                    employee.skills.push(skill);
                    employee.save();
                    res.redirect(`/employees/${employee._id}`);
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('The Employee Insights tool is running on port 3000');
});















