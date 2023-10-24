const mongoose = require("mongoose");
// ORDERS schema ======================================================

const ordersSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  order_items: {
    type: Array,
    required: true,
  },
  order_date: {
    type: Number,
    required: true,
  },
  cart_total_price: {
    type: Number,
  },
  status: {
    type: String,
  },
});

const orders = mongoose.model("Orders", ordersSchema);

module.exports = orders;











const createOrder = async (req, res) => {
  try {
    const { customerId, orderItems, cartTotalPrice } = req.body;
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log(token);

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token verification failed' });
      }

      const customer = await User.findById(decoded.customerid);
      console.log(customer);

      if (!customer) {
        return res.status(403).json({ error: 'Email validation required to create an order.' });
      }

      if (customer._id.toString() !== customerId) {
        return res.status(403).json({ error: 'Unauthorized: customerId does not match token.' });
      }
      const newOrder = new Order({
        id: uuidv4(),
        status: 'Open',
        order_date: new Date(),
        customer_Id: customerId,
        order_items: orderItems,
        cart_total_price: cartTotalPrice,
      });

      await newOrder.save();

      res.status(201).json({ message: 'Order created successfully.', order: newOrder });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
