const user = require("../../Model/User");

exports.getAllUser = (req, res) => {
  user
    .find({})
    .then((data) => {
      if (data) {
        res.status(200).json({ message: data });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
