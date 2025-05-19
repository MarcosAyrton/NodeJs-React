import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import UserModule from "./pages/users";
import Home from "./pages/home/Home";
import NavBar from "./layouts/NavBar";
import ProductoModule from "./pages/productos";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios/*" element={<UserModule />} />
        <Route path="/productos/*" element={<ProductoModule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
