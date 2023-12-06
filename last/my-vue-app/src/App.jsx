import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/navbar/navbar'
import AboutUsPage from './components/about/about';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Shop from './components/shop/shop';



function App() {
  return (
    <BrowserRouter>
      < NavbarComponent/>
      <Routes>
        <Route path='/about' element={<AboutUsPage/>}/>
        <Route path='/shop' element={<Shop/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
