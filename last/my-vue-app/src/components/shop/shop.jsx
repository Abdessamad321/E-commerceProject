// // Import necessary dependencies
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
// import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
// import { parseISO } from 'date-fns';
// import { AiOutlineStock } from "react-icons/ai";
// import './shop.css';

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [sortBy, setSortBy] = useState('default');
//   const [conditionFilter, setConditionFilter] = useState('all');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [priceRangeFilter, setPriceRangeFilter] = useState({ min: 0, max: 100000 });
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:7000/v1/allproducts');
//         setProducts(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const sortProducts = () => {
//     let sortedProducts = [...products];

//     if (sortBy === 'priceLowToHigh') {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (sortBy === 'priceHighToLow') {
//       sortedProducts.sort((a, b) => b.price - a.price);
//     } else if (sortBy === 'newestArrivals') {
//       sortedProducts.sort((a, b) => parseISO(b.createdAt) - parseISO(a.createdAt));
//       console.log('ikhaan', sortedProducts.sort((a, b) => parseISO(b.createdAt) - parseISO(a.createdAt)));
//     }

//     return sortedProducts;
//   };

//   const filterProducts = (sortedProducts) => {
//     let filteredProducts = [...sortedProducts];

//     if (conditionFilter !== 'all') {
//       filteredProducts = filteredProducts.filter((product) => product.condition === conditionFilter);
//     }

//     if (categoryFilter !== 'all') {
//       console.log('Category Filter:', categoryFilter);
//       filteredProducts = filteredProducts.filter((product) => {
//         console.log('Product Category:', product.categoryName);
//         return product.categoryName === categoryFilter;
//       });
//       console.log('Filtered Products:', filteredProducts);
//     }

//     filteredProducts = filteredProducts.filter(
//       (product) => product.price >= priceRangeFilter.min && product.price <= priceRangeFilter.max
//     );

//     return filteredProducts;
//   };

//   return (
//     <div className="mt-4">
//       <Row>
//         <Col md={3} className="filter-sidebar">
//           <Form>
//             <Form.Group controlId="sort">
//               <Form.Label>Sort By:</Form.Label>
//               <Form.Control as="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                 <option value="default">Default</option>
//                 <option value="priceLowToHigh">Price Low to High</option>
//                 <option value="priceHighToLow">Price High to Low</option>
//                 <option value="newestArrivals">Newest Arrivals</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="conditionFilter">
//               <Form.Label>Condition Filter:</Form.Label>
//               <Form.Control as="select" value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)}>
//                 <option value="all">All</option>
//                 <option value="new">New</option>
//                 <option value="used">Used</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="categoryFilter">
//               <Form.Label>Category Filter:</Form.Label>
//               <Form.Control as="select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
//                 <option value="all">All</option>
//                 <option value="Furniture & Decor">Furniture & Decor</option>
//                 <option value="Collectibles & Artifacts ">Collectibles & Artifacts</option>
//                 <option value="Fashion & Accessories">Fashion & Accessories</option>
//                 <option value="Books & More">Books & More</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group style={{display:'grid'}} controlId="priceRangeFilter">
//               <Form.Label>Price Range Filter:</Form.Label>
//               <input
//                 type="range"
//                 min={0}
//                 max={100000}
//                 step={1}
//                 value={priceRangeFilter.max}
//                 onChange={(e) => setPriceRangeFilter({ min: 0, max: parseFloat(e.target.value) })}
//               />
//               <span>${priceRangeFilter.min} - ${priceRangeFilter.max}</span>
//             </Form.Group>
//           </Form>
//         </Col>

//         <Col md={9} style={{ minWidth: '800px', minHeight: filterProducts(sortProducts()).length < 3 ? '500px' : 'inherit' }}>
//           <Row>
//             {filterProducts(sortProducts()).map((product) => (
//               <Col key={product._id} md={4} className="mb-4">
//                 <Card style={{ padding: '0px', borderRadius: '16px', position: 'relative' }}>
//                   <div className="top-left-button">
//                     <Button
//                       variant="link"
//                       onClick={() => setSelectedProduct(selectedProduct === product ? null : product)}
//                       style={{padding:'0' ,    background: 'white',borderRadius:" 50%"}}

//                     >
//                       <FaInfoCircle style={{ fontSize: '2rem', color: '#590404' }} />
//                     </Button>
//                   </div>
//                   <div>
//                   <Card.Img variant="top" src={product.product_image} style={{ height: '200px', width:'200px', paddingTop:'5px', aspectRatio:'2/2',objectFit:'contain' }} />
//                   </div>
//                   <Card.Body style={{ padding: '0' }} className="containers">
//                     <Card.Title className="ellipsis" title={product.product_name}>
//                       {product.product_name}
//                     </Card.Title>
//                     <Card.Text className=" desc ellipsis" title={`${product.short_description}`}>
//                       {product.short_description}
//                     </Card.Text>
//                     {selectedProduct === product && (
//                       <div className="long-description">
//                         <h4>{product.product_name}</h4>
//                         {product.long_description}
//                       </div>
//                     )}
//                     <div className="bottom" style={{ display: 'flex', width: '100%' }}>
//                       <div className="details" style={{ width: '70%', textAlign: 'left', padding: '15px 0 15px 15px' }}>
//                         <p style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom:'0px '}}>${product.price}</p>
//                         <p style={product.options && product.options.includes('In Stock') ? { color: 'green', margin:'0', fontWeight:'600' } : {color: 'red', margin:'0', fontWeight:'600' }}>{product.options} <AiOutlineStock /></p>
//                       </div>
//                       <div
//                         className="buy"
//                         style={{
//                           width: '30%',
//                           cursor: 'pointer',
//                           padding: '15px 0',
//                           background: '#590404',
//                           display: 'flex',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           borderBottomRightRadius: '16px',
//                           borderTopLeftRadius: '16px',
//                         }}
//                       >
//                         <FaShoppingCart className="buy-child" style={{ fontSize: '1.5rem', color: '#fff' }} />
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Shop;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { parseISO } from "date-fns";
import { AiOutlineStock } from "react-icons/ai";
import { useCart } from "../../../CartContext";
import { LuHeart } from "react-icons/lu";
import "./shop.css";

const Shop = () => {
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState({
    min: 0,
    max: 100000,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/v1/allproducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const sortProducts = () => {
    let sortedProducts = [...products];

    if (sortBy === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newestArrivals") {
      sortedProducts.sort(
        (a, b) => parseISO(b.createdAt) - parseISO(a.createdAt)
      );
    }

    return sortedProducts;
  };

  const filterProducts = (sortedProducts) => {
    let filteredProducts = [...sortedProducts];

    if (conditionFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.condition === conditionFilter
      );
    }

    if (categoryFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.categoryName === categoryFilter
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRangeFilter.min &&
        product.price <= priceRangeFilter.max
    );

    return filteredProducts;
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const addToLike = (product) => {
    dispatch({ type: "ADD_TO_LIKED_PRODUCTS", payload: product });
  };
  return (
    <div className="mt-4">
      <Row>
        <Col md={3} className="filter-sidebar">
          <Form>
            <Form.Group controlId="sort">
              <Form.Label>Sort By:</Form.Label>
              <Form.Control
                as="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="priceLowToHigh">Price Low to High</option>
                <option value="priceHighToLow">Price High to Low</option>
                <option value="newestArrivals">Newest Arrivals</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="conditionFilter">
              <Form.Label>Condition Filter:</Form.Label>
              <Form.Control
                as="select"
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="categoryFilter">
              <Form.Label>Category Filter:</Form.Label>
              <Form.Control
                as="select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Furniture & Decor">Furniture & Decor</option>
                <option value="Collectibles & Artifacts ">
                  Collectibles & Artifacts
                </option>
                <option value="Fashion & Accessories">
                  Fashion & Accessories
                </option>
                <option value="Books & More">Books & More</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              style={{ display: "grid" }}
              controlId="priceRangeFilter"
            >
              <Form.Label>Price Range Filter:</Form.Label>
              <input
                type="range"
                min={0}
                max={100000}
                step={1}
                value={priceRangeFilter.max}
                onChange={(e) =>
                  setPriceRangeFilter({
                    min: 0,
                    max: parseFloat(e.target.value),
                  })
                }
              />
              <span>
                ${priceRangeFilter.min} - ${priceRangeFilter.max}
              </span>
            </Form.Group>
          </Form>
        </Col>

        <Col
          md={9}
          style={{
            minWidth: "800px",
            minHeight:
              filterProducts(sortProducts()).length < 3 ? "500px" : "inherit",
          }}
        >
          <Row>
            {filterProducts(sortProducts()).map((product) => (
              <Col key={product._id} md={4} className="mb-4">
                <Card
                  style={{
                    padding: "0px",
                    borderRadius: "16px",
                    position: "relative",
                  }}
                >
                  <div className="top-left-button">
                    <Button
                      variant="link"
                      onClick={() =>
                        setSelectedProduct(
                          selectedProduct === product ? null : product
                        )
                      }
                      style={{
                        padding: "0",
                        background: "white",
                        borderRadius: "50%",
                      }}
                    >
                      <FaInfoCircle
                        style={{ fontSize: "2rem", color: "#590404" }}
                      />
                    </Button>
                  </div>
                  
                  <div className="top-right-button">
                    <Button
                      onClick={() => addToLike(product)}
                      style={{
                        padding: "0",
                        background: "white",
                        borderRadius: "50%",
                        border:'none'
                      }}
                    >
                      <LuHeart
                        style={{ fontSize: "2rem", color: "#590404" }}
                      />
                    </Button>
                  </div>
                  
                  <div>
                    <Card.Img
                      variant="top"
                      src={product.product_image}
                      style={{
                        height: "200px",
                        width: "200px",
                        paddingTop: "5px",
                        aspectRatio: "2/2",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Card.Body style={{ padding: "0" }} className="containers">
                    <Card.Title
                      className="ellipsis"
                      title={product.product_name}
                    >
                      {product.product_name}
                    </Card.Title>
                    <Card.Text
                      className=" desc ellipsis"
                      title={`${product.short_description}`}
                    >
                      {product.short_description}
                    </Card.Text>
                    {selectedProduct === product && (
                      <div className="long-description">
                        <h4>{product.product_name}</h4>
                        {product.long_description}
                      </div>
                    )}
                    <div
                      className="bottom"
                      style={{ display: "flex", width: "100%" }}
                    >
                      <div
                        style={{
                          width: "70%",
                          textAlign: "left",
                          padding: "15px 0 15px 15px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "800",
                            marginBottom: "0px",
                          }}
                        >
                          ${product.price}
                        </p>
                        <p
                          style={
                            product.options &&
                            product.options.includes("In Stock")
                              ? {
                                  color: "green",
                                  margin: "0",
                                  fontWeight: "600",
                                }
                              : { color: "red", margin: "0", fontWeight: "600" }
                          }
                        >
                          {product.options} <AiOutlineStock />
                        </p>
                      </div>
                      <div
                        className="buy"
                        style={{
                          width: "30%",
                          cursor: "pointer",
                          padding: "15px 0",
                          background: "#590404",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderBottomRightRadius: "16px",
                          borderTopLeftRadius: "16px",
                        }}
                        onClick={() => addToCart(product)}
                      >
                        <MdAddShoppingCart
                          className="buy-child"
                          style={{ fontSize: "2rem", color: "#fff" }}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Shop;
