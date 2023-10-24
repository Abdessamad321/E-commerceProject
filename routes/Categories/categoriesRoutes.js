const express = require("express");
const categoriesRoute = require("../../controllers/categorieController");
const router = express.Router();

router.post('/categories', categoriesRoute.createCategories)

// router.get('/categories', categoriesRoute.allCategories)

router.get("/categories", categoriesRoute.searchCategories);

router.get("/categories/:id", categoriesRoute.retrieveIdCategorie);

router.put("/categories/:id", categoriesRoute.updateCategorie);

router.delete("/categories/:id", categoriesRoute.deleteCategorie)

module.exports = router;

// const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
// console.log(token);
//     const { customer_id, order_items, cart_total_price } = req.body;
// // try {
//     if (!customer_id || !order_items || !cart_total_price) {
//       return res.status(500).send({ message: 'Missing fields' });
//     } else {
  
   
//   jwt.verify(token, secretKey, async (err, decoded) => {
//     if (err) {
//       return res('problem'); 
//             }
//             const customer = await User.findById(decoded.customer_id);
//             console.log(customer)
//             if (!customer) {
//               return res.status(403).json({ error: 'Email validation required to create an order.' });
//             } else {
//               // Status open when just created
//               const newOrder = new Order({
//                 id: uuidv4(),
//                 status: 'Open', // default status
//                 order_date: new Date(), // should be updated when the order is created
//                 customer_Id: customer_id,  // corrected variable name
//                 order_items: order_items,  // corrected variable name
//                 cart_total_price: cart_total_price,  // corrected variable name
//               });
//               await newOrder.save()
//             };
//       });
  
//     res.status(201).json({ message: 'Order created successfully.', order: newOrder });
//   }