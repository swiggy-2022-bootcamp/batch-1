const { required } = require('joi')

const
  express = require('express'),
  server = express(),
  port = process.env.PORT || 3000,
  classes =  [
    { id: 1, name: 'arabic' },
    { id: 2, name: 'english' }
  ],
  resource = '/api/classes',
  Joi = require('joi')
  
server.use(express.json()) 

// Show PORT ENV 
server.listen(port, () => { console.log(`listening on port ${port} ....`) })

////////////////////////////
// Common functions
////////////////////////////
// Check if the class  exists
function checkExistingClass (classID, res) {
  const id = parseInt(classID),
    matchedClass = classes.find(c => c.id === id)
  if (matchedClass) return matchedClass
  else res.status(404).send('The class was not found ')
}

// Check Validation
function checkValidation (body, res) {
  const
    schema = Joi.object({
      name: Joi.string().required()
      // studentNumbers:Joi.number().required()
    }),
    {error} = schema.validate(body) // {the property of the target object here is error}
  
  if (error) {
    const errors = (error.details.map(d => d.message)).join(',')
    res.status(400).send(errors)
    return false
  } else  return true
  

}
////////////////////////////
// Get Method Requests
////////////////////////////
// Parent dir
server.get('/', (req, res) => {
  res.send('Node HTTP Module Hello World ')

})


// Get all classes
server.get(resource, (req, res) => {
  res.send(classes)
})

// Get a class by Id
server.get(`${resource}/:id`, (req, res) => {
  const matchedClass = checkExistingClass(req.params.id, res)
  if (matchedClass) res.send(matchedClass)
})

////////////////////////////
// Post Method Requests
////////////////////////////
server.post(`${resource}`, (req, res) => {
  if (!checkValidation(req.body, res)) return
  else {
    const newClass = {
      id: classes.length + 1,
      name : req.body.name
    }
    classes.push(newClass)
    res.send(newClass)
  }
 
 
})

////////////////////////////
// PUT Method Requests
////////////////////////////
server.put(`${resource}/:id`, (req, res) => {
  const
    matchedClass = checkExistingClass(req.params.id, res),
    isValid = checkValidation(req.body, res)
  
  if (!matchedClass || !isValid) return

  else {
    matchedClass.name = req.body.name
    res.send(matchedClass)
  }

})

////////////////////////////
// Delete Method Requests
////////////////////////////
server.delete(`${resource}/:id`, (req, res) =>
{
  const
    matchedClass = checkExistingClass(req.params.id, res),
    indexOfMatchedClass = classes.indexOf(matchedClass) ?? null
  
  if (matchedClass) {
    classes.splice(indexOfMatchedClass, 1)
    res.send(classes)
  }
})