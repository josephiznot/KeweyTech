require("dotenv").config();
const massive = require("massive");
const cors = require("cors");
const express = require("express");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 3001;
const { json } = require("body-parser");
const passport = require("passport");
const { strat } = require(`${__dirname}/controllers/authCtrl`);
const serializeUser = require("./controllers/serializeUser");

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);
app.use(json());
app.use(cors());

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 //1 week
    }
  })
);

app.use(passport.initialize());
app.use(session());
passport.use(strat);

passport.serializeUser(serializeUser.serializer);
passport.deserializeUser((user, done) => {
  return done(null, user);
});

//----------------------AUTH REQUEST------------------------------
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "http://localhost:3000/#/login"
  })
);

app.listen(PORT, () => {
  console.log(`I am listening on port ${PORT}`);
});
