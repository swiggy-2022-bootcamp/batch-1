// if in development mode
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //for mongodb database
const passport = require("passport"); //authentication and serialization of users
const session = require("express-session"); //handling sessions of users
const initializePassport = require("./config/passport-config");
//init app
const app = express();

// Passport Config
initializePassport(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// login, logout
app.use("/", require("./routes"));

//port
const PORT = process.env.PORT || 4000;
//start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
