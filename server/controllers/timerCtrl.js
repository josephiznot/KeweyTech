"use strict";

var start;
function setTimer(req, res, next) {
  console.log(req.body);
  if (req.body.start) {
    // start = setInterval(() => console.log("hit"), 1000);
    start = true;
    res.status(201).send(start);
  } else {
    // clearInterval(start);
    // res.status(200).send({ message: "Timer stopped" });
    start = false;
    res.status(200).send(start);
  }
}
function getTimer(req, res, next) {
  res.status(200).send(start);
}
module.exports = {
  setTimer,
  getTimer
};
