import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/Home/HomePage.jsx';
import Shop from './Pages/Shop/Shop.jsx';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Shop" element={<Shop />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;

