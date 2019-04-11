var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
require("dotenv").config();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var mongoose = require("mongoose");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    key: "test_123",
    secret: "niceone",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

mongoose
  .connect(`mongodb://${process.env.DB_HOST}/users`, {
    useNewUrlParser: true
  })
  .then(() => console.log("Database connected"));

module.exports = app;
