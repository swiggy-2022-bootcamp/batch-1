require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

const meetings = [
  {
      userid: 'arjunob96',
      meeting_id: 1,
      date_of_meeting: new Date(2022,0,10),
      start_time: '11:00',
      end_time: '12:00',
      description: 'test meeting',
      email_attendees: 'abc@gmail.com, xyz@gmail.com'
  }
]

// view users
app.get('/users', (req, res) => {
    res.json(users)
  })
  
  // register user
  app.post('/users', async (req, res) => {
        
      var flag = 0;
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = { userid: req.body.userid, password: hashedPassword }
      for (i=0;i<users.length;i++){
          if(users[i].userid === user.userid)
          {
              flag = 1
          }
      }
      if(flag == 0){
        users.push(user)
        res.status(201).send('User registered successfully')
      }
      else{
        res.status(400).send('Username already exists')
      }
      
  })


// Login Feature

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  }
  

app.post('/login', async (req, res) => {
  // Compare userid and password and authenticate user
  const userid = users.find(user => user.userid === req.body.userid)
  if (userid == null) {
    return res.status(400).send('User Not registered. Please register first.')
  }
  try {
    if(await bcrypt.compare(req.body.password, userid.password)) {
        const user = { name: req.body.userid }

  const accessToken = generateAccessToken(user)
  
  res.json({
      message: "Login Success!", 
      accessToken: accessToken})
      
    } else {
      res.send('Login Failed. Please enter correct details.')
    }
  } catch {
    res.status(500).send()
  }


  
  
})



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      //console.log(err)
      if (err) return res.sendStatus(403)
      req.userid = user.name
      console.log(req.userid)
      next()
    })
  }


// view meetings
app.get('/meetings', authenticateToken, (req, res) => {
    //console.log(req)
  res.json(meetings.filter(meeting => meeting.userid === req.userid))
})


// create meetings

app.post('/meetings', authenticateToken, (req, res) => {
    
    const meeting = { 
        userid: req.userid,
        meeting_id: meetings.length + 1,
        date_of_meeting: req.body.date_of_meeting,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        description: req.body.description,
        email_attendees: req.body.email_attendees
         }
    meetings.push(meeting)
    res.status(201)
    console.log(meeting)
    res.json(meeting)
    
})


// view specific meeting
app.get('/meetings/:id', authenticateToken, (req, res) => {
    //console.log(req)
    var flag = 0;
    for (i=0;i<meetings.length;i++){
        if(meetings[i].userid === req.userid && meetings[i].meeting_id === parseInt(req.params.id))
        {
            console.log('found')
            res.json(meetings[i]);
            flag = 1;
            break;
        }
    }
    if(flag == 0){
      users.push(user)
      res.send('Meeting does not exist')
    }
  
})


// delete meeting

app.delete('/meetings/:id', authenticateToken, (req, res) => {
    //console.log(req)
    var flag = 0;
    var index = -1;
    for (i=0;i<meetings.length;i++){
        if(meetings[i].userid === req.userid && meetings[i].meeting_id === parseInt(req.params.id))
        {
            console.log('meeting found')
            index = i;
            //res.json(meetings[i]);
            flag = 1;
            break;
        }
    }
    if(flag == 0){
      users.push(user)
      res.send('Meeting does not exist')
    }
    else{
        meetings.splice(index,1);
        res.send('Meeting deleted successfully!')
    }
  
})


app.listen(3000)