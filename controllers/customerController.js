const express = require("express");
const Customer = require("../models/Customers");
const xss = require("xss");
const bcrypt = require("bcrypt");
const validationCustomer = require("../middlewares/ValidationMiddleware");
const jwt = require("jsonwebtoken");
// const sendEmail = require('../middlewares/EmailSender');

async function createCustomer(req, res) {
  const { first_name, last_name, email, password } = req.body;
  const firstName = xss(first_name);
  const lastName = xss(last_name);
  const realEmail = xss(email);
  const realPass = xss(password);

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
                first_name: firstName,
                last_name: lastName,
                email: realEmail,
                password: hash,
                creation_date: new Date(),
                last_login: new Date(),
              });
              const savedCustomer = await newCustomer.save();
              // sendEmail( email,first_name, password);
              console.log("Customer created success", savedCustomer);
            }
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
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

    // GENERATING A TOKEN
    const token = jwt.sign({ id: data.id }, tokenKey, {
      expiresIn: "30s",
    });
    res.cookie("token", token);
    const refreshToken = jwt.sign({ id: data.id }, refreshKey, {
      expiresIn: "60s",
    });
    data.refreshToken.push({ refreshTkn: refreshToken });
    data.save();
    console.log(token);
    console.log(refreshToken)
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

module.exports = {
  createCustomer: createCustomer,
  loginCustumer: loginCustumer,
};
