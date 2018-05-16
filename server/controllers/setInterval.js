var hasStarted = false;
var start;
function setTimer(req, res, next) {
  if (hasStarted) {
    start = setInterval(() => console.log("hit"), 1000);
    res.status(201).send({ message: "Timer started" });
  } else {
    clearInterval(start);
    res.status(200).send({ message: "Timer stopped" });
  }
  hasStarted = !hasStarted;
}
module.exports = {
  setTimer
};
