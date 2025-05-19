const express = require("express");
const router = express.Router();

const {
  getProductos,
  getOneProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("../controllers/productos.controller");

router.get("/getProductos", getProductos);
router.get("/getProductos/:id", getOneProducto);
router.post("/createProducto", createProducto);
router.put("/updateProducto/:id", updateProducto);
router.delete("/deleteProducto/:id", deleteProducto);

module.exports = router;
