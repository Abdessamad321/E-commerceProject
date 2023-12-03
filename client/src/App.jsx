import './App.css'
import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../src/pages/home/home"
import Login from "../src/pages/login/login"
import Register from "../src/pages/register/register"
import { Toaster } from "react-hot-toast";
import { AuthContext } from './utils/authContext';
// import ForgotPassword from './pages/forgetpsw/forgetpswd';

// function App() {
  
//   return (
//     <>
//     <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
//      <Routes>
//       <Route path="/" element={<Home />}/>
//       <Route path="/register" element={<Register />}/>
//       <Route  index path="/login" element={<Login />}/>
//      </Routes>
  
//     </>
//   )
// }

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!authCtx.token || authCtx.refToken ? (
            <>
            {/* <Route path="/forgot-password" element={<ForgotPassword />}></Route> */}
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            </>
          ) : (
            <>
               <Route path="/" element={<Home />}/>
            </>
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App
