const user = require("../Model/User");
exports.verifychapa = (req, res) => {
  const data = req.params.body.split(",");
  console.log(data);
  user.findOne({ email: data[1] }).then((item) => {
    console.log(item);
    user
      .findOneAndUpdate(
        { email: data[1] },
        { balance: item.balance + parseInt(data[0]) },
        { new: true }
      )
      .then((ittem) => {
        console.log(ittem);
      });
  });
};
