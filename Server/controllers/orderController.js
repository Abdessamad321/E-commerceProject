const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customers");
const Order = require("../models/Orders");

require("dotenv").config();
const secretKey = process.env.TOKEN_KEY;
const refreshKey = process.env.REFRESH_KEY;

// create Order===================================
async function createOrder(req, res) {
  try {
    const { customerId, orderItems, cartTotalPrice } = req.body;
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token verification failed' });
      }
      const customer = await Customer.findById(decoded.customerid);
      console.log(customer._id.toString());

       if (!customer) {
         return res.status(403).json({ error: 'Email validation required to create an order.' });
       }

      if (customer._id.toString() !== customerId) {
        return res.status(403).json({ error: 'Unauthorized: customerId does not match token.' });
      }
      const newOrder = new Order({
        status: 'Open',
        order_date: new Date(),
        customer_id: customerId,
        order_items: orderItems,
        cart_total_price: cartTotalPrice,
      });
      await newOrder.save();
      res.status(201).json({ message: 'Order created successfully.', order: newOrder });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error : error });
  }
};

//list and search for Order =======================================

async function allOrder(req, res) {
  try {
    const page = req.query.page || 1;
    const forPage = 10;
    const findorders = await Order
      .aggregate([
        { $skip: (page - 1) * forPage },
        { $limit: forPage },
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $project: {
            _id: 1,
            first_name: "$customer.first_name",
            last_name: "$customer.last_name",
            order_items:1,
            order_date:1,
            cart_total_price: 1,
          },
        },
      ])
      .exec();

    if (!findorders) {
      return res.status(404).json("No orders with that name found");
    } else {
      return res.status(200).json(findorders);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

//get Order by ID ============================

async function OrderById(req, res) {
  const orderid = req.params.id;
  const orders = await Order
    .aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(orderid),
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: { path: "$customer", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          first_name: "$customer.first_name",
          last_name: "$customer.last_name",
          order_items:1,
          order_date:1,
          cart_total_price: 1,
        },
      },
    ])
    .exec();
  if (!orders) {
    return res.status(404).json("No orders found");
  } else {
    return res.status(200).json(orders);
  }
}

//update Order by ID ============================

async function updateOrder(req, res){
  try {
    const orderid = req.params.id
     const {statu}  = req.body
    
    const orders = await Order.findByIdAndUpdate(orderid,{ status : statu})

    if(!orders){
      res.status(404).json('No order with that ID found')
    }else{
      orders.save()
      res.status(200).json('the order has updated successfully')
    }
  } catch (error) {
    res.status(500).json({error: error.message })
  }
}

module.exports = {
  createOrder: createOrder,
  allOrder: allOrder,
  OrderById: OrderById,
  updateOrder:updateOrder
};
