import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useProductoContext } from "../../context/ProductosContext";

const ProductoForm = () => {
  const { createProducto, editProducto, getProductoById } = useProductoContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ nombre: "", precio: "", stock: "", fechaCarga: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      if (id) {
        setIsEditing(true);
        try {
          const producto = await getProductoById(id);
          setFormData({
            nombre: producto.nombre || "",
            precio: producto.precio || "",
            stock: producto.stock || "",
            fechaCarga: producto.fechaCarga || "",
          });
        } catch (error) {
          console.error("Error al cargar los datos del producto:", error);
        }
      }
    };
    fetchProducto();
  }, [id, getProductoById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await editProducto(id, formData);
    } else {
      await createProducto({ ...formData, fechaCarga: new Date().toISOString() });
    }
    navigate("/productos");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-semibold text-green-700 text-center mb-6">
          {isEditing ? "Editar Producto" : "Crear Producto"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-green-700 font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingrese el nombre del producto"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 font-medium mb-2">Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingrese el precio del producto"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 font-medium mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingrese el stock del producto"
              required
            />
          </div>
          {isEditing && (
            <div>
              <label className="block text-green-700 font-medium mb-2">Fecha de Carga</label>
              <input
                type="text"
                name="fechaCarga"
                value={formData.fechaCarga || ""}
                readOnly
                className="w-full px-4 py-2 border border-green-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all shadow-lg"
          >
            {isEditing ? "Actualizar Producto" : "Crear Producto"}
          </motion.button>
        </form>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/productos")}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-all shadow-lg"
        >
          Cancelar
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProductoForm;
