# Building a Q&A website such as StackOverflow or Reddit

## to do / plan

* [X] login, registeration 
* [X] mongodb connection
* [X] adding HTTP error codes for faliure etc
* [X] adding session for _logged in_ user
* [X] creating endpoint for asking a question
* [X] POST endpoint for answering a question.
* [ ] refactoring to make code base structure cleaner
* [ ] refine login, registeration
* [ ] adding JWT tokens for login
* [ ] GET endpoint for enumerating all questions
* [ ] Endpoint to upvote a question or an answer
* [ ] Endpoint to get stats of a user
* [ ] Deploying this to cloud
* [ ] GET endpoint for enumerating answers to a question 
* [ ] Endpoints to perform upvote

## Objects

### 1. User
- username
- password

### 2. Post 
- ```question```
- List of ```Answer```s
- ```User```

### 3. Question
- ```QuestionId``` 
- ```Statement```
- List of ```Answer``` strings 
- ```Upvotes```
- ```User```

### 4. Answer
- ```Statement```
- ```Upvotes```
- ```User```

--


# Public Endpoints 

### 1. POST http://localhost:8080/register

to register a new user

Header:
Content-Type: application/x-www-form-urlencoded

Body:

username - <username>
password - <password>

HTTP 202 when a new user is created
HTTP 400 when invalid/missing credentials are provided 

### 2. POST http://localhost:8080/login

Header:

```Content-Type: application/x-www-form-urlencoded```

Body:

username - <username>
password - <password>

HTTP 200 on successful login
HTTP 400 on invalid creds
HTTP 500 on server issues

### 3. GET http://localhost:8080/logout

to log the user out.



### 4. GET http://localhost:8080/session

to check who is logged in 



## Q an A related endpoints

### 1 Ask a question via:  POST http://localhost:8080/ask

**Request fields:**
- statement : < the question statment>

(the user id is picked up from the session)



** Response ** :



HTTP 202 when question is created succesfully
HTTP 400 when field is missing

Examples

**202 ACCEPTED**
```
{
    "status": true,
    "questionId": "a488d4b8a77778217da12fe99ab86675",
    "message": "Succesfully submitted question!"
}
```

**400 BAD REQ**
```
{
    "status": false,
    "message": "parameter 'statment' is missing or empty"
}
```


### 2 Answer a question via POST http://localhost:8080/answer

fields: 
- questionId : <needed > example: b6a2b8566ea41e617f2ec541922b3f1d
- answer : <answer to the question >

HTTP 202 on new answer accepted by system
HTTP 400 on invalid inputs


(examples similar to the one above)
