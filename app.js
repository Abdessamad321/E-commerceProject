const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const PORT = 7000;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

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




const customers = require("./routes/Customers/CustomerRoutes");
app.use("/customers", customers);

mongoose.connection.on("connected", () => {
  console.log("connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
