const getGeofences = (req, res) => {
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
    .catch(err => console.log(err));
};
const updatePoints = (req, res) => {
  var { center, points, alias } = req.body;
  var { id } = req.params;
  req.app
    .get("db")
    .update_geofence([center, JSON.stringify(points), id, alias, false])
    .then(response => {
      getGeofences(req, res);
    })
    .catch(console.log);
};
const addGeofence = (req, res) => {
  var { center, points, alias } = req.body;
  var { id } = req.params;
  req.app
    .get("db")
    .add_geofence([center, JSON.stringify(points), id, alias, false])
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
  toggleActive,
  resetToggles,
  addGeofence
};
