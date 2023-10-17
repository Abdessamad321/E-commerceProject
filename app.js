const express = require("express");
const PORT = 3000;
const app = express();

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

mongoose.connection.on("connected", () => {
  console.log("connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
