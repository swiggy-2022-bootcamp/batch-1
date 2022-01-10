# StackOverFlow REST API

This is the case-study project of Week0 of Swiggy I++ 2022.

## Setup

1. Download & Install NodeJS
2. Clone the repository using `git clone <repository-url>`
3. Navigate to the local repository `cd batch-1`
4. Change branch using `git checkout divyalok-jaiswal`
5. Run `npm install`

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
    -   responseTypes.js
    -   verifyToken.js
-   .dummyenv
-   .gitignore
-   index.js
-   package.json

## Contributing

1. Fork the repository
2. Clone the forked repository using `git clone <forke-repo-url>`
3. Navigate to local repository folder using `cd batch-1`
4. Change branch using `git checkout divyalok-jaiswal`
5. Create a separate branch using `git checkout -b newbranch divyalok-jaiswal`
6. Make your changes
7. Test the code properly
8. Commit changes and make a pull request 

## Tech Stack

1. Backend: ExpressJS/NodeJS
2. Database: Mongoose/MongoDB
3. Authentication: JWT (JSON Web Tokens)
4. Logging: Morgan

<strong>Note:</strong><br>
Link to project's PPT: https://bit.ly/3zHYXex
