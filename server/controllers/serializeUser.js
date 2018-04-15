const passport = require("passport");

module.exports = {
  serializer: (user, done) => {
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
  }
};
