const axios = require("axios");

const addHit = (req, res) => {
  var { latitude, longitude, accuracy, user_id, fence_id } = req.body;
  console.log("fence_id being sent to DB: ", fence_id);
  req.app
    .get("db")
    .add_hit([latitude, longitude, accuracy, user_id, fence_id])
    .then(response => {
      getHistory(req, res);
    });
};
/*
MAY HAVE TO RETURN A VALUE FROM <get_history.sql>
*/
const getHistory = (req, res) => {
  req.app
    .get("db")
    .get_history()
    .then(response => {
      res.status(200).send(response);
    });
};
const deleteHistory = (req, res) => {
  var { id } = req.params;
  req.app
    .get("db")
    .delete_history(id)
    .then(response => {
      getHistory(req, res);
    })
    .catch(console.log);
};
const editResolution = (req, res) => {
  var { resolution } = req.body;
  var { id } = req.params;
  req.app
    .get("db")
    .edit_resolution([resolution, id])
    .then(response => {
      getHistory(req, res);
    })
    .catch(console.log);
};
const putHit = (req, res) => {
  var { id } = req.params;
  var { latitude, longitude } = req.body;
  req.app
    .get("db")
    .put_hit([latitdue, longitude, id])
    .then(response => {
      getHistory(req, res);
    });
};

module.exports = {
  addHit,
  deleteHistory,
  getHistory,
  editResolution,
  putHit
};
