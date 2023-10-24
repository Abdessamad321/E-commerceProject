const express = require("express");
const customerRoute = require("../../controllers/customerController");
const router = express.Router();

router.post("/customers", customerRoute.createCustomer);

router.post("/customers/login", customerRoute.loginCustumer);

// router.get("/customers", (req, res, next) => {
//   if (Object.keys(req.query).length > 2) {
//     customerRoute.searchCustomer(req, res, next);
//   } else {
//     customerRoute.allCustomers(req, res, next);
//   }
// });

router.get('/customers', customerRoute.searchCustomer)

router.get('/customers/profile', customerRoute.profileCustomer);

router.get('/customers/:id', customerRoute.retrieveCustomer);

router.get('/customers/validate/:id', customerRoute.validateCustomer);

router.put('/customers/:id', customerRoute.updateCustomer);

router.delete('/customers/delete', customerRoute.deleteCustomer);

router.patch('/customers/profile/update', customerRoute.updateIdCustomer);

module.exports = router;