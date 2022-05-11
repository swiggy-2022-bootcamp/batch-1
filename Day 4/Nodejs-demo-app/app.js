const { query } = require('express');
const Express = require('express');
const app = Express();
app.use(Express.json());

let arr = [
    {'id':3,'course':'java'},
    {'id':1,'course':'c++'},
    {'id':2,'course':'python'},
]

// Default request on page load.
app.get('/',(req,res)=>{

    res.send("Hello world. This message is for base URL");

});

//GET endpoint to return all the courses.
app.get('/courses',(req,res)=>{
    
    res.send(arr);
});

//GET request to return a particular course
app.get('/course/:id',(req,res)=>{
    let course = arr.find(c => (c.id == req.params.id));
    if(course) res.send(course);
    else
        res.status(404).send('The course is not available');
})
//POST request to add a new course
app.post('/course',(req,res)=>{
    if(!req.body.coursename){
        res.status(400).send("Req body doesn't contain coursename");
        return;
    }
    let id = arr.length + 1;
    let coursename = req.body.coursename;

    let obj = {
        'id' : id,
        'course':coursename 
    }
    if(arr.push(obj))
        res.send(obj);
    else
        res.status(404).send("Course addition failed");

})


//PUT request to update an existing course
app.put('/course/:id',(req,res)=>{
    let course = arr.find(c =>(c.id == req.params.id))
    if(!course){
        res.status(404).send("Course not present");
        return;
    }

    if(!req.body.coursename){
        res.status(400)._construct("Coursename not present");
    }

    course.course = req.body.coursename;
    res.send(course);
})

//DELETE request to delete a particular course
app.delete('/course/:id',(req,res)=>{
    const course = arr.find(c =>(c.id == req.params.id))
    if(!course){
        res.status(404).send("Course not present");
        return;
    }

    arr.splice(arr.indexOf(course),1);
    res.send("course deleted");
})

port = process.env.PORT || 8080;
app.listen(port,()=>{
    //console.log(process.env.PORT);
    console.log(`listening on port ${port}`);
});