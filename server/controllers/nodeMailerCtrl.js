// require("dotenv").config();
var nodemailer = require("nodemailer");
var ses = require("nodemailer-ses-transport");
var _ = require("lodash");

var transporter = nodemailer.createTransport(
  ses({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  })
);
const sendExpiredHits = (req, res) => {
  var { history, email } = req.body;
  console.log(req.body);

  transporter.sendMail({
    from: "keweytechnologies@gmail.com",
    to: email,
    subject: "History Statement",
    text: `Here is a record of your previously deleted hits:
     ${req.body.history.map((e, i) => {
       return JSON.stringify(e);
     })}`
    //splice end of string to get rid of brackets
  });
};
const getHitsBeforeDeleted = (req, res) => {
  req.app
    .get("db")
    .get_hits_before_deleted(req.params.key)
    .then(response => {
      res.status(200).send(response);
    });
};
const emailDirections = (req, res) => {
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
