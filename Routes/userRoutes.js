const express = require('express');
const router = express.Router();
const {
  validateRequest,
  validatesigninRequest,
  isValidatedRequest,
} = require('../Validate/Validate');
const { signup } = require('../Controller/user/Signup');
const { Signin } = require('../Controller/user/Signin');
const { verifyOtp } = require('../Controller/VerifyOtp');
const { getAllUser} = require('../Controller/Admin/GetAllUser')
const {addwallet} = require('../Controller/addwallet')
const { verifypayment} = require('../Controller/Verifypayment')
/* const {s} = require("../Controller/user/Signin")
 */
router.post('/user/signup', validateRequest, isValidatedRequest, signup);
router.post('/user/verifyotp', verifyOtp);
router.post('/user/signin',validatesigninRequest,isValidatedRequest,Signin);
router.get('/getalluser',getAllUser);
router.post('/addwallet',addwallet);
router.get('/verify-payment/:id', verifypayment)

module.exports = router;
