# Food Delivery Application

## Problem Statement

It is known fact that in today’s work-from-home world, people prefer ordering food that can be delivered at the comfort of their home. So most of the times people end up ordering food from restaurants that have delivery services. The objective of this problem statement is to come up with a solution for people to order food online and get prompt delivery.
You need to solve the given problem by developing a web application, that should facilitate users to order food online from different restaurants using the web-app to cater their needs.

## Features:
 - User Registration and Login
 - Place order for multiple items by User
 - User wallet for placing orders
 - User Deletion
 - Restaurant Registration and Login
 - Inventory Management by Restaurant
 - Restaurant Deletion
 - Splliting of order amount among Company and restaurants
 - Authentication & Authorisation implemented using JSON Web Tokens (JWTs)
 - Major npm libraries used: express, mongoose, http-errors, jsonwebtoken
 - Techstack used: Node.js, mongoDB, Docker

## Docker Deployment

To run the project in Docker

```bash
  docker build . -t demo/app
  docker run -p 8080:8080 -d demo/app
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/ayan59dutta/batch-1/tree/ayan-dutta
```

Go to the project directory

```bash
  cd project/food-delivery-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:demo
```
## API Endpoints

  - GET /api/users
    * Fetches all registered users
 - POST /api/users/register
    * Registers a new user
 - POST /api/users/login
    * Logs in a user
 - GET auth /api/users/{userID}
    * Fetches user with the given userID
 - PUT auth /api/users/{userID}
    * Amends user with the given userID
 - DELETE auth /api/users/{userID}
    * Deletes user with the given userID
 - GET auth /api/users/{userID}/cart
    * Fetches the cart of the user with the given userID
 - POST auth /api/users/{userID}/cart
    * Adds items to the cart of the user with the given userID
 - POST auth /api/users/{userID}/checkout
    * Checks out the cart of the user with the given userID
 - GET auth /api/users/{userID}/balance
    * Fetches the balance of the user with the given userID
 - PUT auth /api/users/{userID}/balance
    * Tops up the balance of the user with the given userID
 - GET /api/restaurants
    * Fetches all registered restaurants
 - POST /api/restaurants/register
    * Registers a new restaurant
 - POST /api/restaurants/login
    * Logs in a restaurant
 - GET /api/restaurants/{restaurantID}
    * Fetches restaurant with the given restaurantID
 - PUT auth /api/restaurants/{restaurantID}
    * Amends restaurant with the given restaurantID
 - DELETE auth /api/restaurants/{restaurantID}
    * Deletes restaurant with the given restaurantID
 - GET /api/restaurants/{restaurantID}/menu
    * Fetches the menu of the restaurant with the given restaurantID
 - POST auth /api/restaurants/{restaurantID}/menu
    * Adds items to the menu of the restaurant with the given restaurantID
 - GET /api/restaurants/{restaurantID}/menu/{foodID}
    * Fetches the food item with the given foodID from the restaurant with the given restaurantID
 - DELETE auth /api/restaurants/{restaurantID}/menu/{foodID}
    * Deletes the food item with the given foodID from the restaurant with the given restaurantID
 - GET auth /api/restaurants/{restaurantID}/orders
    * Fetches the orders of the restaurant with the given restaurantID
 - GET auth /api/restaurants/{restaurantID}/orders/{orderID}
    * Deletes the order with the given orderID from the restaurant with the given restaurantID
 - GET auth /api/restaurants/{restaurantID}/balance
    * Fetches the balance of the restaurant with the given restaurantID
 - GET /api/company
    * Fetches the company details
 - POST /api/company
    * Creates a new company, if none present
 - GET /api/balance
    * Fetches the balance of the company

## Postman Collection Link
https://www.getpostman.com/collections/6dfc70790f03a66524de
