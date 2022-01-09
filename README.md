# Batch 1 - Harshit Gupta

### About

This branch of this repository contains personal work completed entirely by Harshit Gupta, as a Batch-1 participant of first-ever Swiggy IPP (Jan '22 Batch).

### Food App

The "Food App" solution has been built as per the guidelines in 2nd problem statement provided out of 3, and uses Node with Express to handle  backend API endpoints along with MongoDB as Database.

#### Usage

To use the app (Backend API interface) locally in your system, follow these steps: 

1. Clone the source folder (Food App), and open a terminal in the same directory
2. Run `npm install`. In case `npm` isn't recognized in your system, install it from [Node Website](https://nodejs.org/). It is a one-time command and will not be required for later runs of the same version of code, as long as node_modules are available in your code.
3. Following the successful execution of above command, run `npm start`. Leave this command running until you want the API to be available.
4. Use [localhost:4000](https://localhost:4000) domain for testing all API endpoints.
    - [/api/register [POST]](https://localhost:4000/api/register)
    - [/api/authenticate [POST]](https://localhost:4000/api/authenticate)
    - [/api/users [GET]](https://localhost:4000/api/users)
    - [/api/users/:userID [GET]](https://localhost:4000/api/users/1)
    - [/api/users [PUT]](https://localhost:4000/api/users)
    - [/api/users/:userID [DELETE]](https://localhost:4000/api/users/1)
    - [/api/food/ [POST]](https://localhost:4000/api/food)
    - [/api/food/:foodID [GET]](https://localhost:4000/api/food/1)

