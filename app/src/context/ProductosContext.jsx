import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";

export const ProductoContext = createContext();

export const useProductoContext = () => {
  return useContext(ProductoContext);
};

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [message, setMessage] = useState("");

  const APIFetch = "http://localhost:3000/api";

  const getProductos = useCallback(async () => {
    try {
      const response = await axios.get(`${APIFetch}/getProductos`);
      setProductos(response.data.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }, [APIFetch]);

  const getProductoById = async (id) => {
    try {
      const response = await axios.get(`${APIFetch}/getProductos/${id}`);
      const { nombre, precio, stock, fechaCarga } = response.data.data;
      return { nombre, precio, stock, fechaCarga };
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      throw new Error("Error al obtener el producto: " + error.message);
    }
  };

  const createProducto = async (producto) => {
    try {
      const response = await axios.post(`${APIFetch}/createProducto`, producto);
      console.log("Producto creado:", response.data);
      await getProductos();
    } catch (error) {
      console.error("Ocurrió un error al crear el producto:", error);
    }
  };

  const editProducto = async (id, updatedProducto) => {
    try {
      await axios.put(`${APIFetch}/updateProducto/${id}`, updatedProducto);
      await getProductos();
      setMessage("Producto actualizado con éxito");
    } catch (error) {
      setMessage(`Ocurrió un error al actualizar el producto: ${error.message}`);
      console.error("Error al realizar el PUT:", error);
    }
  };

  const deleteProducto = async (id) => {
    try {
      await axios.delete(`${APIFetch}/deleteProducto/${id}`);
      setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
      setMessage(`El producto con ID ${id} fue eliminado exitosamente.`);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setMessage(`Ocurrió un error: ${error.message}`);
    }
  };

  useEffect(() => {
    getProductos();
  }, [getProductos]);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        getProductos,
        getProductoById,
        createProducto,
        editProducto,
        deleteProducto,
        message,
        setMessage,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
