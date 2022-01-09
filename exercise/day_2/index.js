const express = require('express');
const Joi = require('joi');
const app = express();

// middleware used to parse the body of the request
app.use(express.json());


app.get('/', (req, res) => {res.send('Hello World!')});



const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// app.get('/api/courses/:id', (req, res) => {
//     // res.send(req.params.id); //2
//     res.send(req.params); //{"id":"2"}

// });

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course); 

});

//post request to add a new course
app.post('/api/courses', (req, res) => {
    // add input validation
    const schema = Joi.object({ name: Joi.string().min(3).required() })
    const result = schema.validate(req.body);
    console.log(result);

    if(result.error) {
        // res.status(400).send(result.error);
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // if(!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('Name is required and should be minimum 3 characters.');
    //     return;
    // }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


//put request to update a course
app.put('/api/courses/:id', (req, res) => {
    // look up the course
    // if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found.');

    const {error} = validateCourse(req.body); //object destructuring, getting error
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // update course
    course.name = req.body.name;
    // return the updated course
    res.send(course);
});


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}




//delete request to delete a course
app.delete('/api/courses/:id', (req, res) => {
    // look up the course
    // if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found.');

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return the same course
    res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));