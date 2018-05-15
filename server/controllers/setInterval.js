const start = setInterval(() => console.log("hit"), 1000);
const setTimer = (req, res, next) => {
  const { setTimer } = req.body;
  +setTimer && start;
};
const clearTimer = (req, res, next) => {
  const { setTimer } = req.body;
};

module.exports = {
  setTimer,
  clearTimer
};
