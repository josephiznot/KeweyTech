const Auth0Strategy = require("passport-auth0");

const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = process.env;

const strat = new Auth0Strategy(
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    domain: DOMAIN,
    scope: "openid profile",
    callbackURL: "/auth"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);
const getUser = (req, res) => {
  if (!req.user) {
    res.status(401).send({ message: "Not Authorized" });
  } else {
    res.status(200).send(req.user);
  }
};
function logout(req, res) {
  // console.log(req);
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/");
  });
}

module.exports = {
  strat,
  logout,
  getUser
};
