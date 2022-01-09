# Case Study : Swiggy Clone / Food App

Requirements for project: 
a) Node js - Technology to run the server.
b) MongoDB - The NoSQL db used in the case study.
c) Postman - To view responses and test application and its features.

Steps to run project : 
a) Go to secrets/secrets.js and add mongodb link and a JWT key.
b) type node foodApp.js to start the server 
   OR nodemon foodApp.js to start server in debugging mode.

Files/Folders and what they do: 
a) foodApp.js -> main file and entry point of app 
b) package.json -> entails details of project
c) routers -> routes requests based on various factors, contains middlewares and passes control to controllers
c) controllers -> contains the functions that execute when the route matching is called 
d) models -> connecting with db, making the schema of the collection 
e) views -> will contain the various html files that are viewed by client in browser [TO-DO]
f) secrets -> sensitive information that server doesnt want exposed => like jwt keys, db passwords and so on.

Features of project: 
a) User can register,login,logout as customer,admin and restaurant owner.
b) Users can view their profile, update certain fields and altogether even delete their profile from db.
c) Admin can view all users, update their details and delete them.
d) Restaurants can be registered by a user who has registered as restauraunt owner, can update various fields, delete restauraunt from the db as well.
e) Restaurants can add items to menu, remove items and update items and their features.