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
  const { password, isAdmin } = req.body;
  const { id } = req.params;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    req.app
      .get("db")
      .get_hash(hash)
      .then(response => console.log(response));
  });
};
module.exports = {
  createNewAdmin,
  createNewUser
};
