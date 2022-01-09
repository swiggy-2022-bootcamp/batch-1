# Case Study : Food App - Backend

A Node.js Express backend for a food ordering forum.

## Requirements for project: <br /> 
1. Node js - Technology to run the server.  [ Install [NodeJS](https://nodejs.org/en/)]<br /> 
2. MongoDB - The NoSQL db used in the case study. [ Use [MongoDB](https://www.mongodb.com/)]<br /> 
3. Postman - To view responses and test application and its features. [ Install [Postman](https://www.postman.com/downloads/)]<br />

## Steps to run project : <br /> 
1. Clone the application and run "npm install" to install all npm modules used in the application.<br /> 
2. Run "npm run start" to start the server and connect to database.<br /> 
3. access the application using localhost:1234/api/[appropriateApi]


## Files/Folders and what they do: <br /> 
The project's code structure loosely follows MVC model to have seperation of concern.

1. app.js -> main file and entry point of app <br /> 
2. package.json -> list of all the third party modules used in app and details of project <br /> 
3. routes -> routes requests based on various factors, contains middlewares and passes control to controllers<br /> 
4. controllers -> contains the functions that execute when the route matching is called <br /> 
5. models -> connecting with db, making the schema of the collection <br /> 
6. views -> will contain the various html files that are viewed by client in browser [TO-DO]<br /> 
7. secrets -> sensitive information that server doesnt want exposed => like jwt keys, db passwords and so on.<br />
8. authController.js,restaurantController.js and userController.js -> Controllers with functions for authentication, restaurant and user endpoints respecitvely.
9. foodItemRoutes.js , userRoutes.js , restaurantRoutes -> routers for restaurant,foodItems and user purposes respectively
10. userModel.js , restaurantModel.js,foodItemModel.js -> models for the 3 collections we have 

## Features of project: <br /> 
1. User can register and login.<br /> 
2. Users can view all users as well as details of particular user.<br /> 
3. Users can update and delete the profile of users.<br /> 
4. We can add details of the restaurants.<br/>
5. View all restaurants.<br/>
6. Delete the restaurants as well as all the food Items added by that restaurant.<br/>
7. Add,update,delete and view individual and particular food Items.<br/>
8. Filter food items based on Food Type.<br/>
9. Filter food items based on cost as well.<br/>
10. View food items of particular restaurants.<br/>

## Endpoints 

   # USER
1. METHOD->POST ENDPOINT-> /api/register (for registering user)
2. METHOD->POST ENDPOINT-> /api/authenticate (for user login)
3. METHOD->GET  ENDPOINT-> /api/users (for viewing all users)
4. METHOD->GET  ENDPOINT-> /api/user/:userid (for getting details of particular user)
5. METHOD->DELETE  ENDPOINT-> /api/user/:userid (for deleting user details)
6. METHOD->PUT  ENDPOINT-> /api/users (for updating user details)

  # FOOD ITEMS
 
5. METHOD->POST ENDPOINT-> /api/food (for adding a foodItem)
6. METHOD->PUT ENDPOINT-> /api/food (for updating a foodItem) 
7. METHOD->DELETE ENDPOINT-> /api/food/:foodid (for deleting a foodItem) 
8. METHOD->GET ENDPOINT-> /api/food/:foodid (for getting a particular foodItem)
9. METHOD->GET ENDPOINT-> /api/food/:restaurantid (for getting all foodItems of particular restaurant)  
10. METHOD->GET ENDPOINT-> /api/food/all (for getting all foodItems)
11. METHOD->GET ENDPOINT-> /api/food/all?foodType=Indian (for getting foodItems of particular food type)
12. METHOD->GET ENDPOINT-> /api/food/all?eminCost=10&maxCost=250 (for getting foodItems within particular range)

 # RESTAURANT 
13. METHOD->POST ENDPOINT-> /api/restaurant (for adding a restaurant)
14. METHOD->GET ENDPOINT-> /api/restaurant/all (for getting all restaurants)
15. METHOD->DELETE ENDPOINT-> /api/restaurant/:restaurantId (for deleting a restaurant and corresponding food items of that restuarant.)

## Tech Stack and Features :
- Backend : **NodeJS (ExpressJS)**
- Database : **MongoDB**
- Used **JWT** for user authentication
- Used **mongoose** for database schema validation
- Created **postman collection** for testing of the created endpoints


## Coding Practices :
- **Modularised the code** by splitting functionalities into relevant files and folders
- All endpoints return **meaningful status codes** and error messages as mentioned in the documentation.
- Due to schema validation, **improper/incomplete requests are rejected** with relevant messages
- Meaningful github commit messages.
- Use of **.gitignore** to prevent committing unnecessary files. 
- User of **.env file** to store secrets like token secret etc