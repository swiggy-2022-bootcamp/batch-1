# Food Ordering App
Food Ordering App backend built for Swiggy i++ 2022 Stage 2\
Author : https://github.com/ddivyansh18 [Divyansh Dixit (Batch 1)]\
Presentation : https://bit.ly/3n8vXra

### Installation

Install the dependencies and devDependencies and start the server.

```
npm install
node app.js
```
Define the following secrets in the environment or using dotConfig :
MONGO_URI : URL of the mongoDb server
TOKEN_KEY : Secret used for signing of JWT tokens (hexadecimal string) 

###  Tech Stack and Features :
- Backend : **NodeJS (ExpressJS)**
- Database : **MongoDB**
- Used **JWT** for user authentication
- Used **mongoose** for database schema validation
- Used **Joi** for request schema validation
- Created **postman collection** for testing of the created endpoints
- Documented all the endpoints using **swagger**

### Coding Practices :
- **Modularised the code** by splitting functionalities into relevant files and folders
- All endpoints return **meaningful status codes** and error messages as mentioned in the documentation.
- Due to schema validation, **improper/incomplete requests are rejected** with relevant messages
- Meaningful github commit messages.
- Use of **.gitignore** to prevent committing unnecessary files. 
- User of **.env file** to store secrets like database url, token secret etc





