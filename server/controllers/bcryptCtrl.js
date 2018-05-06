const bcrypt = require("bcrypt");

const saltRounds = 10;

const createNewAdmin = (req, res) => {
  const { password, isAdmin } = req.body;
  const { id } = req.params;
  console.log("createNewAdmin", password, id, isAdmin);
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
  console.log("createNewUser");
  console.log(password, isAdmin, adminEmail, id);

  // bcrypt.hash(password, saltRounds, function(err, hash) {
  req.app
    .get("db")
    .get_hash(
      adminEmail
        .split("")
        .splice(0, adminEmail.split("").lastIndexOf("@"))
        .join("")
      //splice off whatever is after @)
    )
    .then(response => {
      console.log(`Here is response ${response[0].admin_password}`);
      bcrypt.compare(password, response[0].admin_password, (err, bcryptRes) => {
        //if password matches
        console.log(bcryptRes);
        if (bcryptRes) {
          // bcrypt.hash(password, saltRounds, (err, hash) => {
          //different hash password than the admin
          req.app
            .get("db")
            .create_new_user([adminEmail, response[0].user_id, id])
            .then(userResponse => {
              res.status(200).send();
            });
          // });
        } else {
          console.log("passwords do not match");
          res.status(500).send();
        }
      });
    })
    .catch(err => {
      console.log(`Emails do not match`), res.status(500).send(err);
    });
  // });
};
const updateAdminPassword = (req, res) => {
  console.log("updateAdminPassword");
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
const updateApiKey = (req, res) => {
  console.log("updateApiKey", req.body.newApiKey, req.params.id);
  req.app
    .get("db")
    .update_api_key([req.body.newApiKey, req.params.id])
    .then(response => {
      res.status(200).send();
    })
    .catch(console.log);
};
const getApiKey = (req, res) => {
  console.log("getApiKey");
  req.app
    .get("db")
    .get_api_key(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(`joe set this.....${err}`);
      res.status(500).send(err);
    });
};
const confirmPassword = (req, res) => {
  //use it for adding a kewey user to and admin's account
  console.log("confirmPassword");
  var { tracker } = req.body;
  var { password } = req.params;
  console.log(tracker, password);

  req.app
    .get("db")
    .get_admin_email_by_tracker(tracker)
    .then(response => {
      req.app
        .get("db")
        .get_hash(response[0].g_email)
        //gets admin's password and user_id
        .then(hashRes => {
          bcrypt.compare(password, hashRes[0].admin_password, (err, hash) => {
            console.log(hash);
            // hash ? res.status(200).send() : res.status(500).send();
            res.status(200).send(hash);
          });
        })
        .catch(err => console.log(err));
    });
};
module.exports = {
  createNewAdmin,
  createNewUser,
  updateAdminPassword,
  updateApiKey,
  getApiKey,
  confirmPassword
};
