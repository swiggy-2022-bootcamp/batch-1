# Meeting Application API

Backend API written in Node.js (using Express.js) for a Meeting Application with RESTful endpoints. It utilizes local mongodb database to read/write/store data and can also be easily used with cloud mongodb atlas.

## Setup

1. Install [NodeJS](https://nodejs.org/en/) and any NodeJS package manager.

   - [npm](https://www.npmjs.com/)
   - [yarn](https://yarnpkg.com/)

2. Run `npm install` or `yarn install` to install the dependencies.

3. Run `npm run build` or `yarn build` once to let babel build the application on ./lib/.

## Usage

Run `npm run start` or `yarn start` after building to run the application on localhost:4000 (default).

### Project Structure

The project's code structure loosely follows MVC model while maintaing complete separation of concern.

-meetingapp
    -config
        -keys.js
        -passport-config.js
    -controllers
        -meetingController.js
        -teamController.js
        -userController.js
    -middleware
        -checkauth.js
    -models
        -meeting.js
        -team.js
        -user.js
    -node_modules
    -routes
        -index.js
        -meetingRoute.js
        -teamRoute.js
        -userRoute.js
    -utils
        -datetime.js
        -response.js
        -validator.js
    -.env
    -.gitignore
    -package-lock.json
    -package.json
    -README.md
    -server.js
