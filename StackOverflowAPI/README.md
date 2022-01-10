# StackOverFlow REST API

This is the case-study project of Week0 of Swiggy I++ 2022.

## Setup

1. Download & Install NodeJS
2. Run `npm install`

## Usage

1. Create a `.env` file in the root repo (use .dummyenv file as reference)
2. Run `npm start`
3. View the application on `localhost:2022` (replace 2022 with the port you have choosen in .env)

This API Implementation follows MVC architecture. Reference below structure for quick navigation.

### Folder Structure

-   config
    -   accessLogStream.js
    -   mongoose.js
-   controllers
    -   handleBadRequest.js
    -   questionController.js
    -   userController.js
-   models
    -   answer.js
    -   comment.js
    -   question.js
    -   user.js
-   routes
    -   index.js
    -   question.js
    -   user.js
-   utils
    -   generateAccessToken.js
    -   verifyToken.js
-   .dummyenv
-   .gitignore
-   index.js
-   README.md
