const Chapa = require("chapa");

exports.withdraw = (req, res) => {
  let myChapa = new Chapa("CHASECK_TEST-f2kHdNpLDf8lQdHYFtKq4WwPnIcPk4R4");

  const customerInfo = {
    amount: req.body.amount,
    currency: "ETB",
    email: req.body.email,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    // tx_ref: 'tx-x12345', // if autoRef is set in the options we dont't need to provide reference, instead it will generate it for us
    callback_url: `http://localhost:4001/api/withdrawVerify/${req.body.amount},${req.body.email}`,
    return_url: "http://localhost:3002/dashboard", // your callback URL
    customization: {
      title: "I love e-commerce",
      description: "It is time to pay",
    },
  };

  myChapa
    .initialize(customerInfo, { autoRef: true })
    .then((response) => {
      /*
    response:
      {
        message: 'Hosted Link',
        status: 'success' || 'failed',
        data: {
          checkout_url: 'https://checkout.chapa.co/checkout/payment/:token'
        },
        tx_ref: 'generated-token' // this will be the auto generated reference
      }
    */
      res.status(200).json({
        chapa: response,
      });
      // saveReference(response.tx_ref)
    })
    .catch((e) => console.log(e)); // catch errors

  // async/await
  //let response = await myChapa.initialize(customerInfo, { autoRef: true })

  //myChapa.verify('txn-reference').then(response => {
  //console.log(response) // if success
  //}).catch(e => console.log(e)) // catch errors

  // async/await
  //let response = await myChapa.verify('txn-reference')
};
