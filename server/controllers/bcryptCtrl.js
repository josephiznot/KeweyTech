const bcrypt = require("bcrypt");

const saltRounds = 10;

const createNewAdmin = (req, res) => {
  const { password, isAdmin } = req.body;
  const { id } = req.params;
  console.log(password, id, isAdmin);
  bcrypt.hash(password, saltRounds, function(err, hash) {
    req.app
      .get("db")
      .create_new_admin([isAdmin, hash, id])
      .then(response => {
        console.log(response);
      });
  });
};
const createNewUser = (req, res) => {
  const { password, isAdmin, adminEmail } = req.body;
  const { id } = req.params;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    req.app
      .get("db")
      .get_hash(
        adminEmail
          .split("")
          .splice(0, adminEmail.split("").lastIndexOf("@"))
          .join("")
        //splice off whatever is after @
      )
      .then(response => {
        bcrypt.compare(
          password,
          response[0].admin_password,
          (err, bcryptRes) => {
            //if password matches
            if (bcryptRes) {
              bcrypt.hash(password, saltRounds, (err, hash) => {
                //different hash password than the admin
                req.app
                  .get("db")
                  .create_new_user([adminEmail, response[0].user_id, id, hash])
                  .then(userResponse => {
                    res.status(200).send();
                  });
              });
            } else {
              res.status(500).send(err);
            }
          }
        );
      })
      .catch(err => console.log(`Email's probaly do not match: ${err}`));
  });
};
const updateAdminPassword = (req, res) => {
  bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
    req.app
      .get("db")
      .update_admin_password([hash, req.params.id])
      .then(response => {
        res.status(200).send();
      })
      .catch(console.log);
  });
};
module.exports = {
  createNewAdmin,
  createNewUser,
  updateAdminPassword
};
