// require("dotenv").config();
var nodemailer = require("nodemailer");
var ses = require("nodemailer-ses-transport");

var transporter = nodemailer.createTransport(
  ses({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  })
);
const sendExpiredHits = (req, res) => {
  var { text } = req.body;
  transporter.sendMail({
    from: "keweytechnologies@gmail.com",
    to: "andythemacjoe@gmail.com",
    subject: "History Statement",
    text: text
  });
};
const getHitsBeforeDeleted = (req, res) => {
  req.app
    .get("db")
    .get_hits_before_deleted(req.params.key)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    });
};
const emailDirections = (req, res) => {
  console.log(req.body);
  var { lat, lng, user, contact_email } = req.body;
  transporter.sendMail({
    from: "keweytechnologies@gmail.com",
    to: contact_email,
    subject: `Directions to ${user}`,
    text: `Click this link for directions to ${user}: http://maps.google.com/?q=${lat},${lng}`
  });
};

module.exports = {
  sendExpiredHits,
  getHitsBeforeDeleted,
  emailDirections
};
