const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");

router.post("/orders", orderController.createOrder);

router.get("/orders", orderController.allOrder);

router.get("/orders/:id", orderController.OrderById);

router.put("/orders/:id", orderController.updateOrder);

router.get("/order/allorders", orderController.getorders);

router.get("/order/getallorders", orderController.getallorders);


module.exports = router;
