const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const customers = require("./routes/Customers/CustomerRoutes");
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 3000;

async function connected() {
  try {
    mongoose.connect(
      "mongodb+srv://elazzaouiabdessamad4:rIovLdBKcXs60Xt2@project.ffyg1k6.mongodb.net/Store"
    );
  } catch (error) {
    console.log(error);
  }
}
connected();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/customers", customers);
app.use(cookieParser());

mongoose.connection.on("connected", () => {
  console.log("connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
