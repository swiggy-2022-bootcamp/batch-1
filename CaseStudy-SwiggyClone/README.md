# Case Study : Swiggy Clone / Food App - Backend

A Node.js Express backend for a Swiggy like food delivery forum.

## Requirements for project: <br /> 
1. Node js - Technology to run the server.  [ Install [NodeJS](https://nodejs.org/en/)]<br /> 
2. MongoDB - The NoSQL db used in the case study. [ Use [MongoDB](https://www.mongodb.com/)]<br /> 
3. Postman - To view responses and test application and its features. [ Install [Postman](https://www.postman.com/downloads/)]<br />

## Steps to run project : <br /> 
1. Go to secrets/secrets.js and add mongodb link and a JWT key.<br /> 
2. Type node foodApp.js to start the server in your terminal <br /> 
   OR nodemon foodApp.js to start server in debugging mode. <br /> 
3. access the application using localhost:3000/[appropriateApi]


## Files/Folders and what they do: <br /> 
The project's code structure loosely follows MVC model to have seperation of concern.

1. foodApp.js -> main file and entry point of app <br /> 
2. package.json -> entails details of project <br /> 
3. routers -> routes requests based on various factors, contains middlewares and passes control to controllers<br /> 
4. controllers -> contains the functions that execute when the route matching is called <br /> 
5. models -> connecting with db, making the schema of the collection <br /> 
6. views -> will contain the various html files that are viewed by client in browser [TO-DO]<br /> 
7. secrets -> sensitive information that server doesnt want exposed => like jwt keys, db passwords and so on.<br />
8. authController.js,restaurantController.js and userController.js -> Controllers with functions for authentication, restaurant and user endpoints respecitvely.
9. restaurantRouter.js , userRouter.js -> routers for restaurant and user purposes respectively
10. userModel.js , restaurantModel.js -> models for the 2 collections we have 

## Features of project: <br /> 
1. User can register,login,logout as customer,admin and restaurant owner.<br /> 
2. Users can view their profile, update certain fields and altogether even delete their profile from db.<br /> 
3. Admin can view all users, update their details and delete them.<br /> 
4. Restaurants can be registered by a user who has registered as restauraunt owner, can update various fields, delete restauraunt from the db as well.<br /> 
5. Restaurants can add items to menu, remove items and update items and their features.<br /> 

## Endpoints 
1. /user/signup for registering user
2. /user/login for user login
3. /user/userProfile for viewing user profile of one that is logged in
4. /user/update and /user/delete for updation and deletion of logged in user
5. /user/logout for user logout
6. /user/all for admin to get info of all users 
7. /user/:id for admin to update and delete user whose id is passed as paramter
8. /restaurant to add,update and delete a restauraunt
9. /restaurant/restaurantProfile to view restauraunt profile
10. /restaurant/food to add,update and delete food items for particular restauraunt.
