const getGeofences = (req, res) => {
  console.log("hit too");
  req.app
    .get("db")
    .get_geofences()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(console.log);
};
const getGeofence = (req, res) => {
  var { id } = req.params;
  req.app
    .get("db")
    .get_geofence(id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(console.log);
};
const updateCenter = (req, res) => {
  var { latitude, longitude } = req.body;
  var { id } = req.params;
  req.app
    .get("db")
    .update_center([latitude, longitude, id])
    .then(response => {
      getGeofences(req, res);
    });
};
const updateName = (req, res) => {
  var { name } = req.body;
  var { id } = req.params;
  req.app
    .get("db")
    .update_name(name, id)
    .then(response => {
      getGeofences(req, res);
    });
};
const toggleActive = (req, res) => {
  var { id } = req.params;
  var { num } = req.body;
  req.app
    .get("db")
    .toggle_active([num, id])
    .then(response => {
      getGeofences(req, res);
    });
};

module.exports = {
  getGeofence,
  getGeofences,
  updateCenter,
  updateName,
  toggleActive
};
