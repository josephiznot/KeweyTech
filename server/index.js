require("dotenv").config();
const massive = require("massive");
const cors = require("cors");
const express = require("express");
const app = express();
const session = require("express-session");
const PORT = 3001;
const { json } = require("body-parser");
const passport = require("passport");
const { strat, logout, getUser } = require(`${__dirname}/controllers/authCtrl`);
const geolocationsCtrl = require("./controllers/geolocationsCtrl");
const userCtrl = require("./controllers/userCtrl");
const authCtrl = require("./controllers/authCtrl");
const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);
const {
  addHit,
  putHit,
  deleteHistory,
  getHistory,
  editResolution,
  fetchAvatar,
  deleteHistoryHits
} = require("./controllers/obCtrl");
const {
  getGeofence,
  getGeofences,
  updatePoints,
  toggleActive,
  resetToggles,
  addGeofence,
  getFenceKeys,
  deleteOldFence
} = require("./controllers/geofencesCtrl");

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);
app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
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
app.get("/logout", logout);
app.get("/api/me", getUser);

//---------------------GEOLOCATION REQUESTS------------------------

app.get("/api/geolocations", geolocationsCtrl.getGeolocations);
app.get("/api/dependent", geolocationsCtrl.getDependent);
app.post("/api/addlocation", geolocationsCtrl.addLocation);

app.post("/api/addcurrentlocation", geolocationsCtrl.addCurrentLocation);

app.get("/api/profilepic", userCtrl.getProfilePic);

app.get("/api/getuser", getUser);

//-----------------TWILIO TEXT ALERT----------------------
// app.get("/api/textalert", geolocationsCtrl.textAlert);

app.get("/api/textalert", () =>
  client.messages
    .create({
      to: process.env.PERSONAL_CELL,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: "This is Joe Anderson"
    })
    .then(() => console.log(client.httpClient.lastResponse.statusCode))
    .catch(err => console.log(err))
);
//----------------------out_of_bounds CONTROLLER----------------

app.post("/api/out_of_bounds_hit", addHit); //used
app.put(`/api/out_of_bounds_hit/:id`, putHit); //USED
app.get("/api/history", getHistory); //USED
app.put("/api/resolution/:id", editResolution); //USED
app.delete("/api/ridhistory/:id", deleteHistory); //USED
app.get("/api/fetch_avatar/:id", fetchAvatar);
app.delete("/api/delete_history_hits/:key", deleteHistoryHits);

//-------------------------geofences CONTROLLER--------------------
app.get("/api/geofence_key/:fence_key", geolocationsCtrl.getFenceId);
//used to be --/api/geofence/:fence_key---///////
app.get("/api/get_fence_keys", getFenceKeys);
app.get("/api/geofence/:id", getGeofence); //USED
app.get("/api/geofences", getGeofences); //USED
app.put("/api/updatepoints/:id", updatePoints); //USED
app.post("/api/addgeofence/:id", addGeofence); //USED
app.put("/api/toggleactive/:id", toggleActive); //USED
app.put("/api/resettoggles", resetToggles); //USED
app.delete(`/api/delete_old_fence/:key`, deleteOldFence);
//---------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`I am listening on port ${PORT}`);
});
