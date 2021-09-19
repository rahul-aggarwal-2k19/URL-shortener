const urlShortener = require("../utils/urlShortener");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

// Path for the public directory
const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

// initializing express application
const app = express();

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
// const inputUrl = process.argv[2];

app.get("", (req, res) => {
  res.render("index", {
    title: "URL Shortener App",
    name: "Rahul Aggarwal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Rahul Aggarwal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is the help text",
    name: "Rahul Aggarwal",
  });
});

app.get("/url_shortener", (req, res) => {
  if (!req.query.url) {
    return res.send({
      error: "URL must be provided",
    });
  }

  urlShortener(req.query.url, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send({
      result_url: data,
    });
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Rahul Aggarwl",
    errorMessage: "This page is not present",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
