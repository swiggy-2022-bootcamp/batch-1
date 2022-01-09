# batch-1

## Student Details:

Name: Arya Shah

Batch: B1

MSTeams Credentials: Arya Shah[SWIGGYP-B1]

Email ID: swiggyb1016@datascience.manipal.edu

# Continued from Day 4

## [ 25:23 ](https://youtu.be/pKd0Rpw7O48?t=1523)  Handling GET Requests

GET Request || Method for getting data 

      server.get('/api/class/:id', (req, res) => {})

- Get Id from request params obj by `req.params.id`
- Find the matched class by *Array.find* `classes.find(c => c.id === id)`
- Send the matched class to the res `res.send(matchedClass)`
- Handle *404 Not found* Error  `res.status(404).send('Not found')`

<br>

## [ 30:09 ](https://youtu.be/pKd0Rpw7O48?t=1809)  Handling POST Requests

POST (Request || Method) for ( creating || adding) data 

      server.post('/api/classes', (req, res) => {})
- We will send the **new data as JSON object** to (server || Database) in *the request body*  
- We need to enable parsing of JSON object in *express* first by add this line after express object 

      
      server.use(express.json()) 

  - What we did here is we added a pice of **Middleware** (`express.json()`)
  - **Middleware** is a type of computer software that provides services to software applications beyond those available from the operating system. It can be described as *"software glue"*
  - `server.use()` => using Middleware in the request processing pipeline

- We need to use [Postman](https://www.postman.com/) for testing  the post
  requests by added data
  into the request body 
