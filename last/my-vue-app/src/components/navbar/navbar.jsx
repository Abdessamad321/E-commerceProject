// NavbarComponent.jsx

import React, { useContext } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { CartContext } from '../../../CartContext';
import { TbShoppingCartQuestion } from "react-icons/tb";
import './navbar.css';

const NavbarComponent = () => {
  const { state } = useContext(CartContext);
  const { cart, likedProducts } = state;

  const cartItemCount = cart.length;
  const likedItemCount = likedProducts.length;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                <FaShoppingCart />
                {cartItemCount > 0 && <span className="cart-count" 
                  style={{position: 'absolute',
                    top: '-5px',
                    right: '8px',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '4px 8px',
                    fontSize: '0.8rem'}}>
                {cartItemCount}</span>}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {cartItemCount === 0 ? (
                  <Dropdown.Item  disabled style={{display:'grid', justifyItems: 'center', }}>
                    <TbShoppingCartQuestion style={{ fontSize: "4rem", color: "#f1e496" }}/>
                    <p>Shopping cart is Empty</p> 
                    <p>Welcome back! If you had items in your shopping cart,<br /> we saved them for you. If you want to see them SIGN IN.</p>
                  </Dropdown.Item>
                ) : (
                  cart.map((product) => (
                    <Dropdown.Item key={product._id}>
                    <img style={{width:'80px',height:'80px', borderRight:'solid 1px #333'}} src={product.product_image} alt="" /> 
                    <div style={{display:'grid', paddingLeft:'10px'}}>
                      <p>{product.product_name}</p>
                      <p style={{paddingBottom:'0'}}>{product.price}</p>
                    </div>
                      
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                <FaHeart />
                {likedItemCount > 0 && <span className="liked-count" 
                  style={{position: 'absolute',
                    top: '-5px',
                    right: '8px',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '4px 8px',
                    fontSize: '0.8rem'}}>
                {likedItemCount}</span>}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {likedItemCount === 0 ? (
                  <Dropdown.Item disabled>No liked items</Dropdown.Item>
                ) : (
                  likedProducts.map((product) => (
                    <Dropdown.Item key={product._id}>
                      <img style={{width:'80px',height:'80px', borderRight:'solid 1px #333'}} src={product.product_image} alt="" /> 
                      <div style={{display:'grid', paddingLeft:'10px'}}>
                        <p>{product.product_name}</p>
                        <p style={{paddingBottom:'0'}}>{product.price}</p>
                      </div>
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;


// import React, { useContext } from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
// import { CartContext } from "../../../CartContext"; // Update the path

// const NavbarComponent = () => {
//   const { state } = useContext(CartContext);

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
//       <Container fluid>
//         <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {/* <Nav.Link href="#home">Home</Nav.Link> */}
//             <Nav.Link href="/shop">Shop</Nav.Link>
//             <Nav.Link href="/profile">Profile</Nav.Link>
//             <Nav.Link href="/about">About</Nav.Link>
//             <Nav.Link href="#">
//               <FaShoppingCart />
//               {state.cart.length > 0 && <span>{state.cart.length}</span>}
//             </Nav.Link>
//             <Nav.Link href="##">
//               <FaHeart />
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavbarComponent;

// import React, { useState } from 'react';
// import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
// import { FaShoppingCart, FaInfoCircle, FaHeart } from 'react-icons/fa';

// const NavbarComponent = ({ cart }) => {
//   const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
//       <Container fluid>
//         <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//           <Nav.Link href="/shop">Shop</Nav.Link>
//             <Nav.Link href="/profile">Profile</Nav.Link>
//             <Nav.Link href="/about">About</Nav.Link>
//             {/* <Nav.Link href='#'><FaShoppingCart/></Nav.Link> */}
//             <Nav.Link href='##'><FaHeart/></Nav.Link>
//             <Nav.Link href='#' onClick={() => setCartDropdownOpen(!cartDropdownOpen)}>
//               <FaShoppingCart />
//             </Nav.Link>
//             <Dropdown show={cartDropdownOpen} align="end">
//               <Dropdown.Toggle variant="link" id="dropdown-basic">
//                 Cart ({cart.length})
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 {cart.map((product) => (
//                   <Dropdown.Item key={product._id}>{product.product_name}</Dropdown.Item>
//                 ))}
//               </Dropdown.Menu>
//             </Dropdown>
//             <Nav.Link href='##'><FaHeart /></Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavbarComponent;
