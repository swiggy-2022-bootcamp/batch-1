<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center"> 

  <h3 align="center">Stack Overflow App</h3>
  <p align="center">
    Aaditya Khetan
    <br />
  </p>
  <p align="center">
    Developed the backend of stack overflow app using Node.js
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project is developed under the Swiggy I++ training program. 
The Stack Overflow application serves as a platform for users to ask and answer questions. The application is built following the MVC architecture where application schemas are present under models directory, application endpoints under routes directory, application logic for each endpoint under the controller directory and the database logic in the services directory. The utils directory contains the logger.js file used for logging mechanism and the middleware directory contains the jwt authentication logic and the security layer.

The REST API documentation can be found at - 
<p>(<a href="https://documenter.getpostman.com/view/14491008/UVXesJVS">API documentation</a>)</p>

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

The following technologies and tools have been equipped to develop this project -

* [JavaScript]
* [Node.js]
* [MongoDB]

The major libraries equipped through the project are as follows
* [express]
* [mongoose]
* [bcrypt]
* [jsonwebtoken]
* [winston]

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm 
  ```sh
  npm install npm@latest -g
  ```
* node.js

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:swiggy-2022-bootcamp/batch-1.git
   ```
2. Switch to branch AadityaKhetan and cd into StackOverflowApp directory
    ```sh
   git checkout AadityaKhetan
   cd StackOverflowApp
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
3. Run the project
   ```sh
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Features -->
## Features
The following user stories have been coverered - 
1. The application should have option to login to system. 
2. The application should allow to register.
3. The application should allow to ask a question.
4. Should allow answer the question.
5. The application should show answers for the particular question

Additional features implemented
* User authentication using JWT (JSON Web Tokens)
* Data persisitence using MongoDB
* Application logging using winston


<p align="right">(<a href="#top">back to top</a>)</p>