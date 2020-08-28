const path = require("path");
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const morgan = require("morgan");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport');

const app = express();

//Passport Config
require('./config/passport')(passport);


//const mongoose = require('mongoose')
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" });

// connectDB
connectDB();
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true ,useUnifiedTopology: true}
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));



// EJS
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

// Body Parser
app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 1111;



// mongoose
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/admin', {useNewUrlParser: true});

// Controlers
//const registerPage = require('./controllers/register')
//const homePage = require('./controllers/home')
//const loginPage = require('./controllers/login')
// const articlesAdd = require("./controllers/articlesAdd");
// const contactPage = require("./controllers/contact");
// const adminPage = require("./controllers/admin");
//const passport = require("./config/passport");

// Static Files
// app.use(express.static(path.join(__dirname,"public")));
app.use(express.static("public"));

// Routes
app.use("/", require("./controllers/home.js"));
app.use("/user", require("./controllers/users.js"));
//app.get("/", homePage);
//app.get("/register", registerPage);
//app.get("/login", loginPage);
// app.get("/articles-add", articlesAdd);
// app.get("/contact", contactPage);
// app.get("/admin", adminPage);

app.listen(
  PORT,
  console.log(
    `App Server Runing in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
