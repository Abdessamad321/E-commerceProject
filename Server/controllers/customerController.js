const express = require("express");
const Customer = require("../models/Customers");
const xss = require("xss");
const bcrypt = require("bcrypt");
const validationCustomer = require("../middlewares/ValidationMiddleware");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middlewares/EmailSender");

const secretKey = process.env.TOKEN_KEY;
const refreshKey = process.env.REFRESH_KEY;

async function createCustomer(req, res) {
  const { first_name, last_name,  email, password } = req.body;
  const firstName = xss(first_name);
  const lastName = xss(last_name);
  const realEmail = xss(email);
  const realPass = xss(password);
  const customer_image = req.file ? req.file.path : null;
  console.log(customer_image);

  const validationErrors = validationCustomer.validatecustomer(
    firstName,
    lastName,
    realEmail,
    realPass
  );
  if (validationErrors.length > 0) {
    return res.status(400).json({ err: validationErrors });
  }

  try {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ err: "Internal server error" });
      } else {
        bcrypt.hash(realPass, salt, async (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ err: "Internal server error" });
          } else {
            const existingCustomer = await Customer.findOne({
              email: email,
            });
            if (existingCustomer) {
              return res
                .status(400)
                .json({ err: "Email is already in use, try something else" });
            } else {
              const newCustomer = new Customer({
                customer_image: customer_image,
                first_name: firstName,
                last_name: lastName,
                email: realEmail,
                password: hash,
              });
              await newCustomer.save();
              sendEmail.sendWelcomeEmail(newCustomer._id, email, password);
              res.status(200).json("Customer created success");
            }
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function loginCustumer(req, res) {
  try {
    const { email, password } = req.body;
    const realEmail = xss(email);
    const realPass = xss(password);
    console.log(email, password);

    // SEARCHING THE Customer AND COMPARE

    const data = await Customer.findOne({ email: realEmail });

    if (!data || !(await bcrypt.compare(realPass, data.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const updatedData = await Customer.updateOne(data, {
      last_login: new Date(),
    });
    // GENERATING A TOKEN
    const token = jwt.sign(
      { customerid: data._id, isDeleted: data.isDeleted },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign({ id: data.id }, refreshKey, {
      expiresIn: "60s",
    });
    console.log(token);
    console.log(refreshToken);
    return res.status(200).json({
      access_token: token,
      token_type: "jwt",
      expires_in: "1h",
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

async function searchCustomer(req, res) {
  const sort = req.query.sort === "DESC" ? -1 : 1;
  const query = req.query.query || "";
  try {
    const customers = await Customer.find({
      first_name: new RegExp(query, "i"),
    }).sort({ createdAt: sort });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function retrieveCustomer(req, res) {
  try {
    const customers = await Customer.findById(req.params.id);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function validateCustomer(req, res) {
  const customerid = req.params.id;
  console.log(customerid);
  try {
    const customers = await Customer.findById(customerid);
    if (!customers) {
      throw new Error("No such Customer");
    } else {
      if (customers._id) {
        customers.valid_account = true;
        customers.save();
        res.redirect("http://localhost:5173/Home");
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateCustomer(req, res) {
  const customerid = req.params.id;
  const { first_name, last_name, email } = req.body;

  try {
    const customers = await Customer.findByIdAndUpdate(customerid, {
      first_name,
      last_name,
      email,
    });

    if (!customers) {
      throw new Error("No such Customer");
    } else {
      customers.active = true;
      res.status(200).json("Customer updated successfully");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deleteCustomer(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const customerId = decodedToken.id;
    const deletedCustomer = await Customer.findByIdAndRemove(customerId);
    if (deletedCustomer) {
      res.json(`Customer with ID ${customerId} deleted successfully`);
    } else {
      res.status(404).json(`Customer with ID ${customerId} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function profileCustomer(req, res) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.send("Invalid Token");
      } else {
        const customerId = decoded.customerid;
        console.log(customerId);
        const customers = await Customer.findById(customerId, {
          password: 0,
          valid_account: 0,
        });
        console.log(customers);
        if (customers) {
          customers.valid_account = true;
          res.json(customers);
        } else {
          res.status(404).json({ error: "Customer not found" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

//=========================== updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
async function updateIdCustomer(req, res) {
  const customerId = req.params.id;
  const { old_password, new_password, first_name, last_name, email } = req.body;
   
  const customer_image = req.file ? req.file.path : null;


  try {
    const customer = await Customer.findById(customerId);

    const isPasswordValid = await bcrypt.compare(
      old_password,
      customer.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    customer.customer_image = customer_image;
    customer.first_name = first_name;
    customer.last_name = last_name;
    customer.email = email;
    customer.password = hashedNewPassword;

    await customer.save();

    customer.valid_account = true;
    customer.active = true;

    res.json(customer);
    console.log(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function allCustomer(req, res) {
  try {
    const customer = await Customer.countDocuments({});
    res.json({ count: customer });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

async function contact(req, res) {
  try {
    const { name, email, message } = req.body;
    console.log(req.body);
    sendEmail.contactEmail(name, email, message);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

// REFRESH TOKEN////////////////////////////////
async function refreshTokens(req, res) {
  try {
    const refreshToken = req.headers["authorization"].split("Bearer ")[1];

    if (!refreshToken) {
      return res.status(401).json("No refresh token found in the headers");
    }

    const decodedRefreshToken = jwt.verify(refreshToken, refreshKey);
    const customer = await Customer.findById(decodedRefreshToken.customerid);

    if (!customer) {
      return res.status(401).json("Invalid refresh token");
    }

    const token = jwt.sign(
      { customerid: customer._id, isDeleted: customer.isDeleted },
      secretKey,
      { expiresIn: "30s" }
    );

    const newRefreshToken = jwt.sign({ customerid: customer._id }, refreshKey, {
      expiresIn: "60s", // Set an appropriate expiration time for refresh token
    });

    res.status(200).json({
      access_token: token,
      token_type: "jwt",
      expires_in: "60s",
      refresh_token: newRefreshToken,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
}

//reset passsssssssss================================

async function resetRquist(req, res) {
  const { email } = req.body;
  try {
    const customers = await Customer.findOne({ email: email });
    if (!customers) {
      return res.status(404).json({ message: "customer not found" });
    }
    const resetToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    customers.resetToken = resetToken;
    customers.resetTokenExpiration = Date.now() + 300000;
    await customers.save();
    sendEmail.sendResetEmail(customers.email, resetToken);
    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Verify ttoken ================================
async function verifyResetToken(req, res) {
  const { token } = req.params;
  try {
    const customers = await Customer.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!customers) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    return res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Set new Passssssssssssssssssssssss=========================
async function setNewPass(req, res) {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const customers = await Customer.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!customers) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashedPass = await bcrypt.hash(newPassword, 10);
    customers.password = hashedPass;
    customers.resetToken = null;
    customers.resetTokenExpiration = null;
    await customers.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createCustomer: createCustomer,
  loginCustumer: loginCustumer,
  searchCustomer: searchCustomer,
  retrieveCustomer: retrieveCustomer,
  validateCustomer: validateCustomer,
  updateCustomer: updateCustomer,
  deleteCustomer: deleteCustomer,
  profileCustomer: profileCustomer,
  updateIdCustomer: updateIdCustomer,
  allCustomer: allCustomer,
  contact: contact,
  refreshTokens: refreshTokens,
  resetRquist: resetRquist,
  verifyResetToken: verifyResetToken,
  setNewPass: setNewPass,
};
