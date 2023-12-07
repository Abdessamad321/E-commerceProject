import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import "./Navbar.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import image from "../../assets/LOGOo.png";
import axios from "axios";
import { useCart } from "../cart/cartcontext";
// import { useLike } from "../like/likecontext";

import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActivatedItem] = useState("Home");
  const { cart } = useCart();
  // const { like } = useLike();
  const [checkout, setCheckout] = useState([]);

  const handleDelete = (productId) => {
    localStorage.removeItem(productId)
    // const cartsaver = cart.filter((cartProduct) => cartProduct._id !== productId);
    // setCheckout(cartsaver);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchortwoEl, setAnchortwoEl] = useState(null);

  const AccountPopoverOpen = (event) => {
    setAnchortwoEl(event.currentTarget);
    document.body.classList.add("overflow-auto");
  };
  const AccountPopoverClose = () => {
    setAnchortwoEl(null);
    document.body.classList.remove("overflow-auto");
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("overflow-auto");
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    document.body.classList.remove("overflow-auto");
  };

  useEffect(() => {
    const originalBodyPaddingRight = document.body.style.paddingRight;

    if (anchortwoEl) {
      document.body.style.paddingRight = "0";
    } else {
      document.body.style.paddingRight = originalBodyPaddingRight;
    }

    return () => {
      document.body.style.paddingRight = originalBodyPaddingRight;
    };
  }, [anchorEl, anchortwoEl]);

  const open = Boolean(anchorEl);
  const Accountopen = Boolean(anchortwoEl);

  const activeItemClick = (item) => {
    setActivatedItem(item);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCheckout = (e) => {
    handlePopoverClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isLogin) {
        // Login
        response = await axios.post(
          "http://localhost:7000/v1/customers/login",
          formData
        );
      } else {
        // Register
        response = await axios.post(
          "http://localhost:7000/v1/customers/",
          formData
        );
      }
      console.log("Authentication successful", response.data);
    } catch (error) {
      console.error("Authentication failed", error);
    } finally {
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    }
  };

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };


  return (
    <nav className={`navbaaar ${scrolled ? "scrolled" : ""}`}>
      <div className="navleft">
        <div
          className={`burger-menu ${isMenuOpen ? "show" : ""}`}
          onClick={toggleMenu}
        >
          <MenuRoundedIcon style={{ fontSize: "2em" }} />
        </div>
        <div className="title">
          <Link to="/">
            <img src={image} alt="" />
          </Link>
        </div>
        <div>
          <ul className={`menu ${isMenuOpen ? "show" : ""}`}>
            <div className="close">
              <CloseRoundedIcon
                onClick={closeMenu}
                style={{ fontSize: "2em" }}
              />
            </div>
            {/* khassu link mazal */}
            <div className="logo">
              <Link exact to="/Shop">
                <img src={image} alt="" />
              </Link>
            </div>
            <li className={`navItem ${activeItem === "Home" ? "active" : ""}`}>
              <NavLink
                exact
                to="/"
                activeClassName
                className="active-link"
                onClick={() => activeItemClick("Home")}
              >
                Home
              </NavLink>
            </li>
            <li className={`navItem ${activeItem === "Shop" ? "active" : ""}`}>
              <NavLink
                to="/Shop"
                className="active-link"
                onClick={() => activeItemClick("Shop")}
              >
                Shop
              </NavLink>
            </li>
            <li
              className={`navItem ${activeItem === "Contact" ? "active" : ""}`}
            >
              <NavLink
                to="/Contact"
                className="active-link"
                onClick={() => activeItemClick("Contact")}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <div className="search-responsive">
                <input
                  type="text"
                  placeholder="Search something..."
                  className="search-responsive-input"
                />
                <SearchIcon className="search-responsive-icon" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="navright">
        <div className="search">
          <input className="search-input" type="text" placeholder="Search" />
          <SearchIcon className="search-icon" />
        </div>
        <div className="icons">
          <div className="shoppingcart" onClick={AccountPopoverOpen}>
            {isLogin ? <AccountCircleOutlinedIcon /> : <AccountCircleIcon />}
          </div>
          <Popover
            open={Accountopen}
            anchorEl={anchortwoEl}
            onClose={AccountPopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ marginTop: "20px", zIndex: 10000 }}
          >
            <Box p={2} maxWidth={500}>
              <Typography variant="h6">
                {isLogin ? "Login" : "Register"}
              </Typography>
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="registerform">
                    <TextField
                      label="Firstname"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Lastname"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#590404",
                    color: "#fff",
                  }}
                  fullWidth
                >
                  {isLogin ? "LOGIN" : "REGISTER"}
                </Button>
              </form>
              <Typography
                variant="body2"
                onClick={toggleForm}
                style={{ cursor: "pointer", marginTop: "1rem" }}
              >
                {isLogin
                  ? "Don't have an account? Register here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </Popover>

          <div className="like">
            <div className="shoppingcart">
              <Link
                style={{
                  cursor: "pointer",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                }}
                to="/Favorites"
              >
                <FavoriteBorderRoundedIcon />
              </Link>
            </div>
            {/* <div className="numbercart">{like.length}</div> */}
          </div>

          <div className="cart" onClick={handlePopoverOpen}>
            <div className="shoppingcart">
              <ShoppingBagOutlinedIcon />
            </div>
            <div className="numbercart">{cart.length}</div>
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ marginTop: "20px", zIndex: 10000 }}
          >
            <Box p={2} maxWidth={300}>
              <Typography variant="h6">Shopping Cart</Typography>
              {cart.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
              ) : (
                cart.map((item) => (
                  <Box
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <img
                      style={{ width: "30%", height: "30%" }}
                      src={item.product_image}
                      alt="Product"
                    />
                    <Typography>{item.product_name}</Typography>
                    <div style={{display:'flex', flexDirection: 'column', alignItems: 'flex-end', gap:'5px'}}>
                    <div onClick={() => handleDelete(product._id)}>
                    <RemoveCircleOutlineRoundedIcon />
                    </div>
                    <Typography>${item.price}</Typography>
                    </div>
                    
                  </Box>
                ))
              )}
              <Button
                variant="contained"
                style={{
                  textDecoration: "none",
                  backgroundColor: "#590404",
                  color: "#fff",
                }}
                fullWidth
                onClick={handleCheckout}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/Payment"
                >
                  Checkout
                </Link>
              </Button>
            </Box>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;