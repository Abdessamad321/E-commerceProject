import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordStrengthBar from 'react-password-strength-bar';
import '../register/register.css'; 
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Register = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server with the form data
      const response = await axios.post('http://localhost:7000/v1/customers', formData);
      toast.success(response.data, 'Check your Email to activate your account.'); 
      toast.success('Check your Email to activate your account.'); 
     // navigate('/login');
     setMessage()
    } catch (error) {
      if (error.response && error.response.status === 400) {
     
        const validationErrors = error.response.data.err;
        toast.error([...validationErrors, 'Please check your input and try again.'].join('\n'));
      } else {
        const errorMessage = error.response.data.err || 'An error occurred';
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Firstname"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          placeholder="Lastname"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="input current-password"
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
         {/* PasswordStrengthBar component */}
        <PasswordStrengthBar password={formData.password} />
        <button className="button" type="submit">
          Register
        </button>
      </form>
      <ToastContainer />
      <div className="additional-content">
        <p>Already have an account?</p>
        <Link to="/login" className="register-link-button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
