const express = require("express");
const customerRoute = require("../../controllers/customerController");
const router = express.Router();
const AMauthorization = require('../../middlewares/AuthAM')

router.post("/customers", customerRoute.createCustomer);

router.post("/customers/login", customerRoute.loginCustumer);

router.get('/customers',AMauthorization, customerRoute.searchCustomer)

router.get('/customers/profile', customerRoute.profileCustomer);

router.get('/customers/:id',AMauthorization, customerRoute.retrieveCustomer);

router.get('/customers/validate/:id', customerRoute.validateCustomer);

router.put('/customers/:id', AMauthorization, customerRoute.updateCustomer);

router.delete('/customers/delete', customerRoute.deleteCustomer);

router.patch('/customers/profile/update', customerRoute.updateIdCustomer);

module.exports = router;