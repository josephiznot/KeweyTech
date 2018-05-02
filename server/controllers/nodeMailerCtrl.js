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
  var transporter = nodemailer.createTransport(
    ses({
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY
    })
  );

  console.log(process.env.AWS_KEY);
  transporter.sendMail({
    from: "josephiznot@gmail.com",
    to: "josephiznot@gmail.com",
    subject: "My Amazon SES Simple Email",
    text: "Amazon SES is cool"
  });
};

module.exports = {
  sendExpiredHits
};
