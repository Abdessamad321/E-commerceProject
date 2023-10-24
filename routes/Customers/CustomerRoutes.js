const express = require("express");
const customerRoute = require('../../controllers/customerController')
const router = express.Router();

router.post("/", customerRoute.createCustomer);

router.post("/login", customerRoute.loginCustumer);

// router.get('/', customerRoute)


module.exports = router;
