import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5173/login' ;
axios.defaults.withCredentials = true
function App() {
  return (
  <Router>
  <Routes>
    <Route path="/login" element={<Login />}/>
  </Routes>
  </Router>
  );
}

export default App;
