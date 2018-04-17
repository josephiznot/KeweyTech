require("dotenv").config();
const massive = require("massive");
const cors = require("cors");
const express = require("express");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 3001;
const { json } = require("body-parser");
const passport = require("passport");
const { strat, logout } = require(`${__dirname}/controllers/authCtrl`);
const geolocationsCtrl = require("./controllers/geolocationsCtrl");
const userCtrl = require("./controllers/userCtrl");
// const authCtrl = require("./controllers/authCtrl");

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
      maxAge: 60000 //1 min
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

passport.serializeUser((user, done) => {
  app
    .get("db")
    .getUserByAuthid(user.id)
    .then(response => {
      if (!response[0]) {
        console.log(response);
        app
          .get("db")
          .addUserByAuthid([
            user.id,
            user.name.givenName,
            user.name.familyName,
            user.picture,
            user.nickname,
            user.displayName
          ])
          .then(res => {
            return done(null, res[0]);
          })
          .catch(err => console.log(err));
      } else {
        console.log(response);
        return done(null, response[0]);
      }
    })
    .catch(err => console.log(err));
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});

//----------------------AUTH REQUEST------------------------------
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/geolocations",
    failureRedirect: "http://localhost:3000/#/login"
  })
);

//---------------------GEOLOCATION REQUESTS------------------------

app.get("/api/geolocations", geolocationsCtrl.getGeolocations);
app.get("/api/dependent", geolocationsCtrl.getDependent);
app.post("/api/addlocation", geolocationsCtrl.addLocation);

app.post("/api/addcurrentlocation", geolocationsCtrl.addCurrentLocation);

app.get("/api/profilepic", userCtrl.getProfilePic);
app.get("/logout", logout);

app.listen(PORT, () => {
  console.log(`I am listening on port ${PORT}`);
});
