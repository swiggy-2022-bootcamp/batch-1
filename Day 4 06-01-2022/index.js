const Joi = require('joi');
const bodyParser  = require('body-parser');
const express = require('express');
const app = express();

// enabling parsing of json objects , adding a middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const courses = [
    {
        id : 1,
        name : 'course1'
    },
    {
        id : 2,
        name : 'course2'
    },
    {
        id : 3,
        name : 'course3'
    },
];

function validateCourse(course) {
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    return schema.validate({"name" : course});
}


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:year/:month', (req, res) => {
    // res.send(req.params);
    res.send(req.query);
})

app.get('/api/courses/:id', (req, res) => {
    console.log("PARAMS: ", req.params);
    console.log("BODY: ", req.body);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) //404
    res.status(404).send(`Course ${req.params.id} not found`);

    res.send(course);
});

app.post('/api/courses', (req, res) => {

    // // Conventional way of API schema validation (not scalable)
    // if(!req.body.name || req.body.name.length < 3) {
    //     res.status(404).send('Name is required');
    //     return;
    // }

    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    
    if(result.error) {
        res.status(404).send(result.error.details[0].message);
        return;
    }


    const course = {
        id : courses.length + 1,
        name : req.body.name
    };

    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send(`Course ${req.params.id} not found`);
        return;
    }

    // Validate
    const {error} = validateCourse(req.body.name);
    
    if(error) {
        res.status(404).send(error.details[0].message);
        return;
    }


    // update the course
    course.name = req.body.name;

    // Return the updated course
    res.send(course);
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));