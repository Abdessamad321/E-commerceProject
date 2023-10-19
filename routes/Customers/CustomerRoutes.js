const express = require("express");
const customerRoute = require('../../controllers/customerController')
const router = express.Router();

router.post("/", customerRoute.createCustomer);

router.post("/login", customerRoute.loginCustumer);

router.get('/', )
// router.get("", (req, res) => {
//   console.log("User is successfully authenticated");
// });

// router.get("", (req, res) => {
//   console.log("User is successfully authenticated");
// });

module.exports = router;
