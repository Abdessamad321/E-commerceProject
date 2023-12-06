import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";
import axios from "axios";


import testslide from "../../assets/testslide.png";
// import clocks from "../../assets/clocks.png";
// import video from "../../assets/testti.mp4";
// import video from "../../assets/testti.mp4";
// import video from "../../assets/testti.mp4";
// import video from "../../assets/testti.mp4";
// import video from "../../assets/testti.mp4";




// import video from "../../assets/testti.mp4";
// import reviews  from './reviews'
import Button from "@mui/material/Button";
import Carouselprdct from "react-multi-carousel";
import Carouselreviews from "react-multi-carousel";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import "react-multi-carousel/lib/styles.css";
// import { productData } from "./data";
import { reviewsData } from "./data";
// import antique from "../../assets/middle.jpg";
// import decoration from "../../assets/second.jpeg";
import firstcategorie from "../../assets/artisanat.jpg";
import secondcategorie from "../../assets/b.jpg";
import tirthcategorie from "../../assets/img.jpg";
import fourthcategorie from "../../assets/decoration.jpeg";
import image from "../../assets/desinfinal.png";

import { useCart } from "../../Components/cart/cartcontext";
// import { useLike } from "../../Components/like/likecontext";

import Card from "../../Components/Card/Card";
import Carousel from "../../Components/Card/Carousel";

// Our collection slide********************************************

import camera from "../../assets/camera.png";
import phone from "../../assets/phone.png";
import gramo from "../../assets/gramo.png";
import clocks from "../../assets/clocks.png";
import radio from "../../assets/radio.png";
import koora from "../../assets/koora.png";
import dactylo from "../../assets/dactyloo.png";


//last section *********************************************************

import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import DiscountRoundedIcon from "@mui/icons-material/DiscountRounded";

const HomePage = () => {
  const { dispatch: cartDispatch } = useCart();
  // const { dispatch: likeDispatch } = useLike();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/v1/allproducts/");
        if (response.status === 200) {
          setProductData(response.data);
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);



  const addToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // FAVORITES///////////////////////////////////

  const [favorites, setFavorites] = useState(() => {
    const jsonValue = localStorage.getItem("favorites");
    if (jsonValue !== null) return JSON.parse(jsonValue);
    // return [];
  });

  const [likedProducts, setLikedProducts] = useState({});

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (product) => {
    setLikedProducts((prevLikedProducts) => {
      const updatedLikedProducts = { ...prevLikedProducts };
      updatedLikedProducts[product._id] = !updatedLikedProducts[product._id];
      return updatedLikedProducts;
    });
    setFavorites((prevFavorites) => [...prevFavorites, product]);
    console.log(favorites);
  };


  let cards = [
    {
      key: 1,
      content: <Card imagen={phone} />,
    },
    {
      key: 2,
      content: <Card imagen={radio} />,
    },
    {
      key: 3,
      content: <Card imagen={camera} />,
    },
    {
      key: 4,
      content: <Card imagen={gramo} />,
    },
    {
      key: 5,
      content: <Card imagen={clocks} />,
    },
  ];

  
  const product = productData.map((item) => (
    <div className="card" key={item.id}>
      <div className="likes-icon" onClick={() => handleFavorite(item)}>
      {likedProducts[item._id] ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
      </div>
      <img className="product--image" src={item.product_image} alt="product image" />
      <div className="cart-text">
        <span className="prdctname">{capitalizeFirstLetter(item.product_name)}</span>
        <p className="ellipsis">{item.short_description}</p>
        <p className="price"><>$</>{item.price}</p>
      </div>
      <div className="addbutton">
        <Button
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            borderRadius: 8,
            border: "none",
            outline: 0,
            padding: 5,
            margin: 10,
            backgroundColor: "#590404",
            color: "#fff",
            textAlign: "center",
            cursor: "pointer",
            fontSize: 14,
          }}
          onClick={() => addToCart(item)}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  ));

  const Reviews = (props) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <span
            key={i}
            className={i <= props.stars ? "star-filled" : "star-empty"}
          >
            ★
          </span>
        );
      }
      return stars;
    };

    return (
      <div className="card">
        <img className="reviews--image" src={props.image} alt="product image" />
        <div className="cart-reviews">
          <span>{props.name}</span>
          <p>{props.description}</p>
          <div className="rating">{renderStars()}</div>
        </div>
      </div>
    );
  };

  const reviews = reviewsData.map((item) => (
    <Reviews
      key={item.id}
      name={item.name}
      image={item.image}
      description={item.description}
      stars={item.rating}
    />
  ));

  /***************CATEGORY_Carousel*****************/

  const categories = [
    {
      id: 1,
      title: "Furniture & Decor",
      description: "Explore antiques furniture, decor, and timeless elegance.",
      imageUrl: firstcategorie,
    },
    {
      id: 1,
      title: "Collectibles & Artifacts",
      description:
        "Discover artifacts and collectibles that tell captivating stories.",
      imageUrl: fourthcategorie,
    },
    {
      id: 1,
      title: "Fashion & Accessories",
      description: "Adorn yourself with vintage timepieces and jewelry.",
      imageUrl: tirthcategorie,
    },
    {
      id: 1,
      title: "Books & More",
      description:
        "Bring the past home with retro kitchenware and classic tools.",
      imageUrl: secondcategorie,
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrevious = () => {
    carouselRef.current.previous();
  };

  return (
    <div>
      <div className="section-home">
        <div className="half-home">
          <div className="home-one">
            <div className="one-title">
              <div className="titlesection">
                <h3>Vintage Flair for Modern Living</h3>
              </div>
              <div>
                <p>
                  Whether you're a history enthusiast, a collector, or someone
                  seeking to add a touch of vintage flair to your space, our
                  store is a haven for those who appreciate the beauty of
                  antiquity.
                </p>
              </div>
              <div className="discoverbutton">
                <Button
                  style={{
                    padding: "8px",
                    borderRadius: "16px",
                    marginTop: "10px",
                    backgroundColor: "#f8e4af",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#590404",
                  }}
                >
                  Discover Now
                </Button>
              </div>
            </div>
          </div>
          <div className="home-two">
            {/* <video autoPlay loop muted playsInline preload="auto">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
            <img className="background" src={image} alt="" />
            <img className="testslide" src={testslide} alt="" />
            <img className="magana" src={clocks} alt="" />
            <img className="radio" src={radio} alt="" />
            <img className="camera" src={camera} alt="" />
            <img className="koora" src={koora} alt="" />
            <img className="phone" src={phone} alt="" />
            <img className="dactylo" src={dactylo} alt="" />
          </div>
        </div>

        {/* category-carousel********************************/}

        <div className="category-carousel">
          <div className="category-title">
            <span>Browse By Category</span>
            <p></p>
          </div>
          <div className="carousel-container">
            {categories.map((category, index) => (
              <div
                // key={uniqueKeys[index]}
                className={`category-card ${
                  index === currentIndex ? "activecard" : ""
                }`}
              >
                <img src={category.imageUrl} alt={`Product ${index + 1}`} />
                <div className="category-info">
                  <span>{category.title}</span>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(89, 5, 5,0.7)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(89, 5, 5,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(89, 5, 5,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#590404" />
            </g>
          </svg>
        </div>
      </div>

      {/* new arrivals*********************************************/}

      <div className="section-carousel">
        <span>New Arrivals</span>
        <Carouselprdct
          additionalTransfrom={0}
          arrows
          autoPlay
          dotListClass=""
          renderDotsOutside={true}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          responsive={{
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 1500 },
              items: 5,
              slidesToSlide: 2,
            },
            desktop: {
              breakpoint: { max: 1500, min: 800 },
              items: 4,
            },
            tablet: {
              breakpoint: { max: 800, min: 464 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {product}
        </Carouselprdct>
      </div>

      {/* cards******************************************************/}

      <div className="topcollection">
        <div className="text">
          <span>
            Step Back In Time and Explore Our Collection Of Vintage Treasures
          </span>
          <p>
            Experience the charm and elegence of bygone eras with our antique
            collection
          </p>
        </div>
        <div className="textslider">
          <Carousel
            cards={cards}
            height="500px"
            width="80%"
            margin="10px auto"
            offset={2}
            showArrows={false}
          />
        </div>
      </div>


      {/* Our Best Product *****************************/}

      <div className="section-carousel">
        <span>Our Best Product</span>
        <Carouselprdct
          additionalTransfrom={0}
          arrows
          autoPlay
          dotListClass=""
          renderDotsOutside={true}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          responsive={{
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 1500 },
              items: 5,
              slidesToSlide: 2,
            },
            desktop: {
              breakpoint: { max: 1500, min: 800 },
              items: 4,
            },
            tablet: {
              breakpoint: { max: 800, min: 464 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {product}
        </Carouselprdct>
      </div>
      

      {/* Reviews ****************************************************************/}

      <div className="reviewsection">
        <div className="title-reviews">
          <div className="secondtitle">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              style={{ color: "#ffffff", fontSize: "4rem" }}
            />
            <span>What our customers say</span>
          </div>
          <div className="outsidebutton">
            <button onClick={handlePrevious}>
              <ArrowBackIosNewRoundedIcon />
            </button>
            <button onClick={handleNext}>
              <ArrowForwardIosRoundedIcon />
            </button>
          </div>
        </div>
        <div className="caroureviews">
          <Carouselreviews
            additionalTransfrom={0}
            arrows={false}
            centerMode={false}
            ref={carouselRef}
            partialVisible
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside
            renderDotsOutside={false}
            responsive={{
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 1500 },
                items: 5,
                slidesToSlide: 2,
              },
              desktop: {
                breakpoint: { max: 1500, min: 800 },
                items: 2,
                partialVisibilityGutter: 60,
              },
              tablet: {
                breakpoint: { max: 800, min: 464 },
                items: 2,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {reviews}
          </Carouselreviews>
        </div>
      </div>

      {/* About our store **********************************************/}

      <div>
        <div className="services-title">
          <span>Why You Picking Us</span>
        </div>
        <div className="lastsection">
          <div className="infos-item">
            <div className="cardfontc">
              <div className="servicesicons">
                <HeadsetMicRoundedIcon style={{ fontSize: "70px" }} />
              </div>
              <h2>24/7 Days</h2>
              <span>Count on us for assistance day or night. Your satisfaction is our priority.
              </span>
            </div>
          </div>
          <div className="infos-item">
            <div className="cardfontc">
              <div className="servicesicons">
                <MonetizationOnRoundedIcon style={{ fontSize: "70px" }} />
              </div>
              <h2>Money Return</h2>
              <span>Not satisfied? No worries. We offer a straightforward and hassle-free money-back guarantee. </span>
            </div>
          </div>
          <div className="infos-item">
            <div className="cardfontc">
              <div className="servicesicons">
                <LocalShippingRoundedIcon style={{ fontSize: "70px" }} />
              </div>
              <h2>Free Delivery</h2>
              <span>Enjoy luxury with complimentary shipping on all orders, adding value to your purchases.
              </span>
            </div>
          </div>
          <div className="infos-item">
            <div className="cardfontc">
              <div className="servicesicons">
                <DiscountRoundedIcon style={{ fontSize: "70px" }} />
              </div>
              <h2>Order Discount</h2>
              <span>Your loyalty is rewarded with special pricing. Dive into a world of savings on every order.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

{
  /* <div className="section-video">
        <video autoPlay loop muted playsInline preload="auto">
          <source src={firstsection[0].video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="contentb">
          <div className="title">
            <h3>{firstsection[0].title}</h3>
          </div>
          <div className="description">
            <p>{firstsection[0].content}</p>
          </div>
        </div>
      </div> */
}












// FAVORITES///////////////////////////////////

  // const [favorites, setFavorites] = useState(() => {
  //   const jsonValue = localStorage.getItem("favorites");
  //   if (jsonValue !== null) return JSON.parse(jsonValue);
  //   console.log(bitch);
  //   // return [];
  // });

  // const [likedProducts, setLikedProducts] = useState({});

  // useEffect(() => {
  //   localStorage.setItem("favorites", JSON.stringify(favorites));
  // }, [favorites]);

  // const handleFavorite = (product) => {
  //   // setIsFavorit(!isFavorit);
  //   setLikedProducts((prevLikedProducts) => {
  //     const updatedLikedProducts = { ...prevLikedProducts };
  //     updatedLikedProducts[product.id] = !updatedLikedProducts[product.id];
  //     return updatedLikedProducts;
  //   });
  //   setFavorites((prevFavorites) => [...prevFavorites, product]);
  //   console.log(favorites);
  // };

  // let cards = [
  //   {
  //     key: 1,
  //     content: <Card imagen={phone} />,
  //   },
  //   {
  //     key: 2,
  //     content: <Card imagen={radio} />,
  //   },
  //   {
  //     key: 3,
  //     content: <Card imagen={camera} />,
  //   },
  //   {
  //     key: 4,
  //     content: <Card imagen={gramo} />,
  //   },
  //   {
  //     key: 5,
  //     content: <Card imagen={clocks} />,
  //   },
  // ];

  
  // const product = productData.map((item) => (
  //   <div className="card" key={item.id}>
  //     <div className="likes-icon" onClick={() => handleFavorite(item)}>
  //     {likedProducts[item.id] ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
  //     </div>
  //     <img className="product--image" src={item.imageurl} alt="product image" />
  //     <div className="cart-text">
  //       <span>{item.name}</span>
  //       <p>{item.description}</p>
  //       <p className="price">{item.price}</p>
  //     </div>
  //     <div className="addbutton">
  //       <Button
  //         style={{
  //           position: "absolute",
  //           bottom: 0,
  //           right: 0,
  //           borderRadius: 8,
  //           border: "none",
  //           outline: 0,
  //           padding: 5,
  //           margin: 10,
  //           backgroundColor: "#590404",
  //           color: "#fff",
  //           textAlign: "center",
  //           cursor: "pointer",
  //           fontSize: 14,
  //         }}
  //         onClick={() => addToCart(item)}
  //       >
  //         Add To Cart
  //       </Button>
  //     </div>
  //   </div>
  // ));
