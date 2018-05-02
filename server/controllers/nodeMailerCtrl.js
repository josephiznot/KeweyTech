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
    from: "josephiznot@gmail.com",
    to: "c.s.anderson848@gmail.com",
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

module.exports = {
  sendExpiredHits,
  getHitsBeforeDeleted
};
