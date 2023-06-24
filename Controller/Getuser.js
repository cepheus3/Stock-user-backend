const user = require("../Model/User");
exports.getuser = (req, res) => {
  user
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        res.status(200).json({
          balance: data.balance,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};
