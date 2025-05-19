import { Routes, Route } from "react-router-dom";
import { ProductoProvider } from "../../context/ProductosContext";
import ProductosView from "./ProductosView";
import ProductoForm from "./ProductoForm";

const ProductoModule = () => {
  return (
    <ProductoProvider>
      <Routes>
        <Route path="/" element={<ProductosView />} />
        <Route path="/crear" element={<ProductoForm />} />
        <Route path="/editar/:id" element={<ProductoForm />} />
      </Routes>
    </ProductoProvider>
  );
};

export default ProductoModule;
