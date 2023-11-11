const express = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD
const cors = require('cors');
=======
const cors = require("cors");
>>>>>>> 58a4105f2fcefae24726d265e05aaa24d5be88da
const app = express();

const PORT = 7000;

const bodyParser = require("body-parser");
require("dotenv").config();
const MongoConnect = process.env.MONGO_CON;

<<<<<<< HEAD
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
=======
app.use(
  cors({
    origin: "*",
  })
);

>>>>>>> 58a4105f2fcefae24726d265e05aaa24d5be88da
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
async function connected() {
  try {
    mongoose.connect(MongoConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
}
connected();

const customers = require("./routes/Customers/CustomerRoutes");
app.use("/v1", customers);

const user = require("./routes/Users/usersRoutes");
app.use("/v1", user);

const categories = require("./routes/Categories/categoriesRoutes");
app.use("/v1", categories);

const subcategories = require("./routes/Subcategories/SubcategoryRouter");
app.use("/v1", subcategories);

const orders = require("./routes/Orders/OrdersRoutes");
app.use("/v1", orders);

const products = require("./routes/Products/ProductsRouter");
app.use("/v1", products);

mongoose.connection.on("connected", () => {
  console.log("connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
