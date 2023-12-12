import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage.jsx";
import Shop from "./Pages/Shop/Shop.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Favorites from "./Pages/Favorites/Favorites";
import ProductDetail from './Pages/ProductDetail/ProductDetail.jsx'
import Checkout from './Pages/CheckOut/CheckOut.jsx'
import Profil from "./Pages/Profile/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/product/:productId" element={<ProductDetail/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/Profil" element={<Profil/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
