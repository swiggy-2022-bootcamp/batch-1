# Building a sample  Q&A website such as StackOverflow or Reddit

## to do

* [X] login, registeration 
* [ ] adding HTTP error codes for faliure etc
* [X] mongodb connection
* [ ] refine login, registeration
* [ ] adding JWT tokens for login
* [X] adding session for _logged in_ user
* [X] creating endpoint for asking a question
* [ ] GET endpoint for enumerating all questions
* [ ] POST endpoint for answering a question
* [ ] GET endpoint for enumerating answers to a question 
* [ ] Endpoint to upvote a question or an answer
* [ ] Endpoint to get stats of a user
* [ ] Deploying this to cloud



## Objects

### 1. User
- username
- password

### 2. Post 
- ```question```
- List of ```Answer```s
- ```User```

### 3. Question
- ```Statement```
- List of ```Answer``` strings 
- ```Upvotes```
- ```User```

### 4. Answer
- ```Statement```
- ```Upvotes```
- ```User```

--

## Public Endpoints
1. POST http://localhost:8080/login

Header:
Content-Type: application/x-www-form-urlencoded

Body:
username - <username>
password - <password>

2. GET http://localhost:8080/session

to check who is logged in 

3. GET http://localhost:8080/logout

to log the user out.

4. POST http://localhost:8080/register

to register a new user

Header:
Content-Type: application/x-www-form-urlencoded

Body:
username - <username>
password - <password>
