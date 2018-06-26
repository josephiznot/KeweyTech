const axios = require("axios"),
  nodemailer = require("nodemailer"),
  ses = require("nodemailer-ses-transport"),
  { AWS_KEY, AWS_SECRET_KEY, REACT_APP_GEOLOCATION_API_KEY: KEY } = process.env;

let transporter = nodemailer.createTransport(
  ses({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET_KEY
  })
);

module.exports = {
  getGeolocations: (req, res, next) => {
    req.app
      .get("db")
      .get_geolocations()
      .then(response => {
        res.status(200).send(response);
      });
  },
  getDependent: (req, res, next) => {
    // console.log(process.env.FENCER_ACCESS_KEY);
    res.status(200).send({ message: "DEPENDENT LOCATION" });
  },
  addLocation: (req, res, next) => {
    const { latitude, longitude, accuracy, user_id } = req.params;
    req.app
      .get("db")
      .add_location[(latitude, longitude, user_id)].then(res =>
        get_geolocations(req, res)
      );
  },
  addCurrentLocation: (req, res, next) => {
    req.app.get("db").add_current_location();
  },
  getFenceId: (req, res) => {
    console.log("hit");
    req.app
      .get("db")
      .get_fence_id(req.params.fence_key)
      .then(response => {
        console.log(JSON.stringify(response[0].fence_id));
        res.status(200).send(JSON.stringify(response[0].fence_id));
      })
      .catch(console.log);
  },
  visitor: (req, res) => {
    console.log("should get an email");
    axios
      .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${KEY}`)
      .then(response => {
        let { lat, lng } = response.data.location;
        transporter.sendMail({
          from: "keweytechnologies@gmail.com",
          to: "josephiznot@gmail.com",
          subject: "Tech news",
          text: `User from ${lat}, ${lng} visited your site at ${new Date()}`
        });
      });
  }
};
