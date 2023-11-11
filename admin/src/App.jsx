<<<<<<< HEAD

import React from "react";
import "./App.css";
function App() {
  return (
  
=======
import React from "react";
import "./App.css";
import Menu from "./Partials/Menu/Menu";
import Navbar from "./Partials/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./Pages/Edit/Edit.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Users from "./Pages/Users/Users.jsx";
import Customers from "./Pages/Customers/Customers.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import Payement from "./Pages/Payement/Payement.jsx";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Navbar />
      <Routes>
        <Route path="/Edit" element={<Edit />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Payement" element={<Payement />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 58a4105f2fcefae24726d265e05aaa24d5be88da
  );
}

export default App;
