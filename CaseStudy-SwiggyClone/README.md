# Case Study : Swiggy Clone / Food App

Requirements for project: <br /> 
a) Node js - Technology to run the server.<br /> 
b) MongoDB - The NoSQL db used in the case study.<br /> 
c) Postman - To view responses and test application and its features.<br /> 

Steps to run project : <br /> 
a) Go to secrets/secrets.js and add mongodb link and a JWT key.<br /> 
b) type node foodApp.js to start the server <br /> 
   OR nodemon foodApp.js to start server in debugging mode.<br /> 

Files/Folders and what they do: <br /> 
a) foodApp.js -> main file and entry point of app <br /> 
b) package.json -> entails details of project <br /> 
c) routers -> routes requests based on various factors, contains middlewares and passes control to controllers<br /> 
c) controllers -> contains the functions that execute when the route matching is called <br /> 
d) models -> connecting with db, making the schema of the collection <br /> 
e) views -> will contain the various html files that are viewed by client in browser [TO-DO]<br /> 
f) secrets -> sensitive information that server doesnt want exposed => like jwt keys, db passwords and so on.<br /> 

Features of project: <br /> 
a) User can register,login,logout as customer,admin and restaurant owner.<br /> 
b) Users can view their profile, update certain fields and altogether even delete their profile from db.<br /> 
c) Admin can view all users, update their details and delete them.<br /> 
d) Restaurants can be registered by a user who has registered as restauraunt owner, can update various fields, delete restauraunt from the db as well.<br /> 
e) Restaurants can add items to menu, remove items and update items and their features.<br /> 
