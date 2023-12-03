import React, { createContext, useContext, useEffect, useState } from "react";
import "../login/login.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth, AuthProvider, AuthContext } from "../../utils/authContext"; 
function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/v1/customers/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      const { access_token, refresh_token } = response.data;
      authCtx.login(access_token, refresh_token);
      const decoded = decodeJwt(access_token);
      const userId = decoded.userId;
      localStorage.setItem("userId", userId);
      navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response && error.response.data && error.response.data.error) {
          // If the server responds with an error message
          setError(error.response.data.error);
          toast.error(error.response.data.error);
        } else {
          // Handle other errors
          setError("An error occurred during login");
          toast.error("An error occurred during login");
        }
      }
    };
    const handleForgotPassword = async () => {
      try {
        const response = await axios.post("http://localhost:7000/v1/customers/forget-password", {
          email: data.email,
          password: data.password,
        });
        console.log(response.data.message);
        toast.success(response.data.message);
      } catch (error) {
        console.error("Forgot Password failed:", error);
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while processing your request");
        }
      }
    };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="input"
          autoComplete="on"
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="input"
          autoComplete="on"
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>
      <ToastContainer />
      <div className="additional-content">
        <p>Don't have an account?</p>
        <Link to="/register" className="register-link-button">
          Register
        </Link>
        <Link to="#" className="forgot-password" onClick={handleForgotPassword}>
        Forgot Password
        </Link>
      </div>
    </div>
  );
}

export default Login;
