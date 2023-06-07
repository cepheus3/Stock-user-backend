const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoutes");
const cors = require("cors");

const axios = require("axios").default;
//const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
require("dotenv").config();

const Chapa = require('chapa')

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data, err) => {
    if (data) {
      console.log("connected sucessfully");
    }
    if (err) {
      console.log(err);
    }
  });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

/*app.use(
  expressCspHeader({
    directives: {
      'default-src': [SELF],
      'connect-src': [SELF, 'http://localhost:3000'],
      'script-src': [SELF, INLINE, '*'],
      'style-src': [SELF, '*'],
      'img-src': ['data:', '*'],
      'worker-src': [NONE],
      'block-all-mixed-content': false,
    },
  })
);
 */
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/api", userRoute);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

if (process.env.NODE_ENV == "production") {
  console.log("production mode active");
} else {
  console.log("devv mode");
  app.get("/", (req, res) => {
    res.send("api running");
  });
}

// CHAPA

/* const CHAPA_URL =
  process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = "CHASECK_TEST-f2kHdNpLDf8lQdHYFtKq4WwPnIcPk4R4";
const config = {
  headers: {
    Authorization: `Bearer ${CHAPA_AUTH}`,
  },
};

app.post("/api/addtowallet", async (req, res) => {
  // chapa redirect you to this url when payment is successful
  const CALLBACK_URL = "http://localhost:4400/api/verify-payment/";
  const RETURN_URL = "http://localhost:4400/api/payment-success/";

  // a unique reference given to every transaction
  const TEXT_REF = "tx-myecommerce12345-" + Date.now();

  //console.log(req.body,"amounttttttt")
  // form data
  const data = {
    amount: req.body.amount,
    currency: "ETB",
    email: req.body.email,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    tx_ref: TEXT_REF,
    callback_url: CALLBACK_URL + TEXT_REF,
    return_url: RETURN_URL,
  };

  // post request to chapa
  await axios
    .post(CHAPA_URL, data, config)
    .then((response) => {
      res.redirect(response.data.data.checkout_url);
    })
    .catch((err) => console.log(err));
});

// verification endpoint
app.get("/api/verify-payment/:id", async (req, res) => {
  //verify the transaction
  await axios
    .get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
    .then((response) => {
      console.log("Payment was successfully verified");
    })
    .catch((err) => console.log("Payment can't be verfied", err));
});

app.get("/api/payment-success", async (req, res) => {
  res.render("success");
}); */
// CHAPA END


/* CHAPA LIABRARY */

const chapa = new Chapa({
  secretKey: 'your-chapa-secret-key',
});

app.post("/api/addtowallet", async (req, res) => {
  const tx_ref = await chapa.generateTransactionReference(); // result: TX-JHBUVLM7HYMSWDA

  const response = await chapa.initialize({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@gmail.com',
    currency: 'ETB',
    amount: '200',
    tx_ref: tx_ref,
    callback_url: 'https://example.com/',
    return_url: 'https://example.com/',
    customization: {
      title: 'Test Title',
      description: 'Test Description',
    },
  });

  
})



/* CHAPA LIABRARY END */

app.listen(process.env.PORT || 4001, () => {
  console.log(`server listineang on port ${process.env.PORT}`);
});
