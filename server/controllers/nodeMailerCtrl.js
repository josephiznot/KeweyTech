let nodemailer = require("nodemailer");
let aws = require("aws-sdk");
aws.config.loadFromPath("config.json");

let transporter = nodemailer.createTransport({
  SES: new aws.SES({ apiVersion: "2010-12-01" })
});

var message = {
  from: "josephiznot@gmail.com",
  to: "josephiznot@gmail.com",
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>"
};

const sendExpiredHits = (req, res) => {
  console.log("MAILED!");
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("server is ready to take messages");
    }
  });
};
module.exports = {
  sendExpiredHits
};
