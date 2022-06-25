const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { networkInterfaces } = require("os");
const { render } = require("ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://xenonstack:xenonstack@cluster0.jzhsw.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const contacts = {
  name: String,
  email: String,
  message: String,
};

const users = {
  email: String,
  password: String,
};

const Contact = mongoose.model("Contact", contacts);
const user = mongoose.model("user", users);

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/home", function (req, res) {
  res.render("index");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.post("/contact", function (req, res) {
  let newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  newContact.save();
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res) {
  user
    .findOne()
    .then((result) => {
      if (
        result.email === req.body.email &&
        result.password === req.body.password
      ) {
        res.render("loggedin");
      } else {
        res.render("incorrectlogin");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on ${port}`));
