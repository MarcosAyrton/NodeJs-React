const Producto = require('../models/Producto');

// GET: todos los productos
const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json({data: productos, status: 200, message: "Productos obtenidos correctamente"});
  } catch (error) {
    res.status(500).json({status: 500, message: "Error al obtener productos", error});
  }
};

// GET: un producto por ID
const getOneProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({status: 404, message: "Producto no encontrado"});
    }
    res.json({status: 200, message: "Producto encontrado", data: producto});
  } catch (error) {
    res.status(500).json({status: 500, message: "Error al obtener el producto", error});
  }
};

// POST: crear producto
const createProducto = async (req, res) => {
  try {
    const {nombre, precio, stock} = req.body;

    const nuevoProducto = await Producto.create({
      nombre,
      precio,
      stock,
      fecha_carga: new Date(),
    });

    res.status(201).json({status: 201, message: "Producto creado correctamente", data: nuevoProducto});
  } catch (error) {
    res.status(500).json({status: 500, message: "Error al crear el producto", error});
  }
};

// PUT: actualizar producto
const updateProducto = async (req, res) => {
  try {
    const {nombre, precio, stock, fecha_carga} = req.body;
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({status: 404, message: "Producto no encontrado"});
    }

    await producto.update({nombre, precio, stock, fecha_carga});

    res.json({status: 200, message: "Producto actualizado correctamente", data: producto});
  } catch (error) {
    res.status(500).json({status: 500, message: "Error al actualizar el producto", error});
  }
};

// DELETE: eliminar producto
const deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({status: 404, message: "Producto no encontrado"});
    }

    await producto.destroy();

    res.json({status: 200, message: `Producto con ID ${req.params.id} eliminado correctamente`});
  } catch (error) {
    res.status(500).json({status: 500, message: "Error al eliminar el producto", error});
  }
};

module.exports = {
  getProductos,
  getOneProducto,
  createProducto,
  updateProducto,
  deleteProducto,
};
