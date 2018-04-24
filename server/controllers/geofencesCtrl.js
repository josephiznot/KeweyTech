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
const updatePoints = (req, res) => {
  //could update alias(name) if wanted to.
  // console.log(req.params.id);
  var { center, points } = req.body;
  console.log(center, points);
  var { id } = req.params;
  req.app
    .get("db")
    .update_points([center, points, id])
    .then(response => {
      getGeofences(req, res);
    })
    .catch(console.log);
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
    })
    .catch(console.log);
};
const resetToggles = (req, res) => {
  var { isActive } = req.body;
  req.app
    .get("db")
    .reset_toggles(isActive)
    .then(response => {
      getGeofences(req, res);
    })
    .catch(console.log);
};

module.exports = {
  getGeofence,
  getGeofences,
  updatePoints,
  updateName,
  toggleActive,
  resetToggles
};
