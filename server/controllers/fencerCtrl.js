const axios = require("axios");

const getPoints = (req, res) => {
  console.log("HIT!!!!");
  axios
    .get(
      `https://api.fencer.io/v1.0/geofence/aa586850-2939-4a7c-9c21-0e61c0d74583`,
      {
        headers: { Authorization: `${process.env.REACT_APP_FENCER_API_KEY}` }
      }
    )
    .then(points => {
      console.log(points.points);
      res.status(200).send(points);
    })
    .catch(console.log);
  console.log("AGAIN");
};

module.exports = {
  getPoints
};
