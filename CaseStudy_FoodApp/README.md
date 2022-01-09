# FoodApp API
### For Swiggy IPP 

## THIS PROJECT HAS BEEN DEPLOYED ONLINE WITH PERSISTENT STORAGE IN DATABASE

# Requirements to run in local
* NodeJS
* Mongodb

# Setup process
* Clone the repository
* run npm install
* create a config folder with dev.env file and put the below variables
    * PORT=3000
    * MONGODB_URL=mongodb://127.0.0.1:27017/food-order-api
* In one terminal - start the mongodb server in local system
* In second terminal - type *npm run dev*

# APIs integrated
# User routes
* POST - */api/register* - user creation
* POST - */api/authenticate* - login user
* POST - */api/users/logout* - logout user from current device
* POST - */api/users/logoutall* - logout user from all devices 
* GET - */api/users* - get all users
* GET - */api/users/:userID* - get user by id
* PUT - */api/users* - update user in payload
* DELETE - */api/users/:userID* - delete user by id

# Food routes
* POST - */api/food* - food creation
* GET - */api/food/:foodID* - get food by id
