const express = require('express')
const session = require("express-session");
const flash = require("express-flash");
const port = process.env.port || 3000;
const app = express();
const router = require('./router')
const passport = require("./lib/passport");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(
    session({
      secret: "rahasia",
      resave: false,
      saveUninitialized: false,
    })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', router)

app.listen(port, () => console.log(`server running on ${port}`))