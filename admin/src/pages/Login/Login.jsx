// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";
// import logo from "../../assets/logotest1.png";
// import axios from "axios";
// import { AuthContext } from "../../AuthContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function decodeJwt(token) {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );

//   return JSON.parse(jsonPayload);
// }

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [userRole, setUserRole] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const authCtx = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Attempting login...");
//       const response = await axios.post(
//         "http://localhost:7000/v1/users/login",
//         {
//           user_name: username,
//           password: password,
//         }
//       );
//       const { access_token, refresh_token } = response.data;
//       authCtx.login(access_token, refresh_token);
//       const decoded = decodeJwt(access_token);
//       const role = decoded.userRole;
//       const userId = decoded.userId;
//       localStorage.setItem("userId", userId);
//       setUserRole(role);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login failed:", error);
//       setError("Invalid password or username");
//       toast.error("Invalid password or username")
//     }
//   };

//   const currentYear = new Date().getFullYear();

//   return (
//     <div className="bodys">
//       <div>
//         <form className="formas">
//           <img className="logos" src={logo} alt="Logo" />
//           <input
//             className="forminput"
//             style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             className="forminput"
//             style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="formbutton" onClick={handleLogin} type="submit">
//             Login
//           </button>
//           <ToastContainer />
//           <p className="footer">&copy; {currentYear} Oldy Goldy House</p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../assets/kiki.png";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login...");
      const response = await axios.post(
        "http://localhost:7000/v1/users/login",
        {
          user_name: username,
          password: password,
        }
      );
      const { access_token, refresh_token } = response.data;
      authCtx.login(access_token, refresh_token);
      const decoded = decodeJwt(access_token);
      const role = decoded.userRole;
      const userId = decoded.userId;
      localStorage.setItem("userId", userId);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid password or username");
      toast.error("Invalid password or username");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7000/v1/users/password/reset",
        {
          user_name: username,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("User not found");
      } else {
        toast.error("Forgot password failed");
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bodys">
      <ToastContainer />
      <div>
        <form className="formas">
          <img className="logos" src={logo} alt="Logo" />
          <input
            className="forminput"
            style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="forminput"
            style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="linkslogin">
            <p className="forgot-password" onClick={handleForgotPassword}>
              Forgot Password?
            </p>
            <Button
              style={{
                textDecoration: "none",
                backgroundColor: "#590404",
                color: "#fff",
                width: "30%",
                borderRadius: "8px",
              }}
              onClick={handleLogin}
              type="submit"
              className="loginbutton"
            >
              Login
            </Button>
          </div>

          <div className="footer">
            <p style={{marginBottom: 0 }}>&copy; {currentYear} Oldy Goldy House</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
