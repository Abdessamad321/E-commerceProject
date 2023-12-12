const express = require("express");
const customerRoute = require("../../controllers/customerController");
const router = express.Router();
const AMauthorization = require("../../middlewares/AuthAM");
const upload = require('../../middlewares/Cloudinary')


router.post("/customers", upload.single('customer_image'), customerRoute.createCustomer);

router.post("/customers/login", customerRoute.loginCustumer);

router.get("/customers", customerRoute.searchCustomer);

router.get("/customers/profile", customerRoute.profileCustomer);

router.get("/customers/:id", customerRoute.retrieveCustomer);

router.get("/customers/validate/:id", customerRoute.validateCustomer);

router.put("/customers/:id", customerRoute.updateCustomer);

router.delete("/customers/delete", customerRoute.deleteCustomer);

router.patch("/customers/update/:id", upload.single('customer_image'), customerRoute.updateIdCustomer);

router.get("/allcustomers/all", customerRoute.allCustomer);

router.post("/customers/contact", customerRoute.contact);

router.post("/customers/refresh/token", customerRoute.refreshTokens);

router.post('/customers/password/reset', customerRoute.resetRquist)

router.get('/customers/password/reset/verify/:token', customerRoute.verifyResetToken)

router.post('/customers/password/reset/update/:token', customerRoute.setNewPass)

module.exports = router;
