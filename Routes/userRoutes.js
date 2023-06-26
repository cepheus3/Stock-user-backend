const express = require("express");
const router = express.Router();
const {
  validateRequest,
  validatesigninRequest,
  isValidatedRequest,
} = require("../Validate/Validate");
const { signup } = require("../Controller/user/Signup");
const { Signin } = require("../Controller/user/Signin");
const { verifyOtp } = require("../Controller/VerifyOtp");
const { getAllUser } = require("../Controller/Admin/GetAllUser");
const { addwallet } = require("../Controller/addwallet");
const { verifychapa } = require("../Controller/Verifypayment");
const { getuser } = require("../Controller/Getuser");
const { withdraw } = require("../Controller/Withdraw");
const { withdrawVerify } = require("../Controller/Verifywithdraw");
const { sendMessage } = require("../Controller/Admin/sendMessage");
const { viewMessage } = require("../Controller/Admin/viewMessage");

/* const {s} = require("../Controller/user/Signin")
 */
router.post("/user/signup", validateRequest, isValidatedRequest, signup);
router.post("/user/verifyotp", verifyOtp);
router.post("/user/signin", validatesigninRequest, isValidatedRequest, Signin);
router.get("/getalluser", getAllUser);
router.post("/addwallet", addwallet);
router.post("/withdrawMoney", withdraw);
router.post("/getuser", getuser);
router.get("/verifychapa/:body", verifychapa);
router.get("/withdrawVerify/:body", withdrawVerify);
router.post("/sendmessage", sendMessage);
router.post("/viewmessage", viewMessage);

module.exports = router;
