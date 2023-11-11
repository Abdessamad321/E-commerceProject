import React from "react";
import { useState } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import profile from "../../Assets/MINE.jpeg";
import logo from "../../Assets/logotest1.png";
function Menu() {
  const [isActive, setIsActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const active = (name) => {
    setIsActive(name === "item1" ? true : false);
  };


  const darkModeCheck = () =>{
    setIsDarkMode(!isDarkMode)
    if (isDarkMode){
      document.documentElement.classList.remove('isLightMode')
    } else{
      document.documentElement.classList.add('isLightMode')
    }
  }

  return (
    <div className="Menu">
      <div className="SideBar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="profile">
          <img src={profile} alt="" />
          <span>Abdessamad E.</span>
          <Link to="/Edit">
            <button> Edit</button>
          </Link>
        </div>
        <div className="list">
          <ul>
            <li className="Dashboard">
              <Link onClick={active} className="item1" to="/Dashboard">
                <DashboardIcon />
                Dashboard
              </Link>
            </li>
            <ul>
              <li>
                <Link to="/Users" className="item1">
                  <AccountCircleIcon />
                  Users
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/Customers" className="item1">
                  <PeopleAltIcon /> Customers
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/Products" className="item1">
                  <ShoppingBagIcon /> Products
                </Link>
              </li>
            </ul>
            <li className="Orders">
              <Link className="item1" to="/Orders">
                <ShoppingCartIcon /> Orders
              </Link>
            </li>
            <li className="Payement">
              <Link className="item1" to="/Payement">
                <MonetizationOnIcon /> Payement
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="dark-mode-switch">
        <p className="dark-label">Light</p>
        <input type="checkbox" id="dark-mode-toggle" checked={isDarkMode} onChange={darkModeCheck}/>
        <label htmlFor="dark-mode-toggle"></label>
        <p className="dark-label">Dark</p>
      </div>
    </div>
  );
}

export default Menu;
