const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const createError = require("http-errors");

var indexRouter = require("./routes/index");

var app = express();

mongoose
    .connect("mongodb+srv://ayan-dutta-swiggy-ipp-f.xrzw8.mongodb.net/", {
        dbName: "ipp-demo-food-delivery-app",
        user: "ayan-dutta-ipp",
        pass: "ayan-dutta-ipp",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Mongodb connected!");
    });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

//middleware: 404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, "Not found"));
});

//Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(3000, () => {
    console.log("Listening at 3000");
});

module.exports = app;
