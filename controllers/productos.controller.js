const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../db/productos.json");

const llamarProductos = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

let productos = llamarProductos();

const guardarProductos = (productos) => {
  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
};

// METODOS

const getProductos = (req, res) => {
  res.json({ data: productos, status: 200, message: "productos obtenidos correctamente" });
};

const getOneProducto = (req, res) => {
  const producto = productos.find((p) => p.id === parseInt(req.params.id));
  if (!producto) return res.json({ status: 404, message: "producto no encontrado" });
  res.json({ status: 200, message: "producto encontrado", data: producto });
};

const createProducto = (req, res) => {
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock: req.body.stock,
    fechaCarga: formatDate(new Date()), // Fecha de carga en formato DD/MM/YYYY
  };
  productos.push(nuevoProducto);
  guardarProductos(productos);
  res.json({ status: 201, message: "producto creado correctamente", data: nuevoProducto });
};

const updateProducto = (req, res) => {
  const { nombre, precio, stock, fechaCarga } = req.body;
  const producto = productos.find((p) => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.json({ status: 404, message: "producto no encontrado" });
  }
  producto.nombre = nombre;
  producto.precio = precio;
  producto.stock = stock;
  producto.fechaCarga = fechaCarga;
  guardarProductos(productos);
  res.json({ status: 200, message: "producto editado correctamente", data: producto });
};

const deleteProducto = (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  productos = productos.filter((p) => p.id !== id);

  guardarProductos(productos);
  res.json({ mensaje: `Producto con ID ${id} eliminado correctamente` });
};

module.exports = {
  getProductos,
  getOneProducto,
  createProducto,
  updateProducto,
  deleteProducto,
};
