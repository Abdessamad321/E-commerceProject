const express = require("express");
const mongoose = require("mongoose");
const PORT = 7000;
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoConnect = process.env.MONGO_CON;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
async function connected() {
  try {
    mongoose.connect(MongoConnect,{ useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.log(error);
  }
}
connected();

const user = require("./routes/Users/usersRoutes");
app.use("/users", user);

mongoose.connection.on("connected", () => {
  console.log("connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
