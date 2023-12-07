import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Contact.css"; // Import your CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:7000/v1/customers/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };
  
  return (
    <div className="contactpage">
      <div className="pic">
        <span className="contacttitle">Contact Us</span>
        <p>
          Our team of friendly experts is ready to assist you with anything you
          need. Whether it's about products, orders, or if you simply want to
          chat about your favorite items – we're here for you! <br /> 
          Feel free to drop us a message using the form below. Your feedback is invaluable to us.
          We look forward to connecting with you! Happy shopping! 
        </p>
        {/* <img src="src/assets/sergey.jpg" alt="" /> */}
      </div>
      <div className="contact-form">
        <form className="forma" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Email"
            variant="outlined"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Message"
            variant="outlined"
            id="message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
