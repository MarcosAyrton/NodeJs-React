import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useProductoContext } from "../../context/ProductosContext";
import ExportPDF from "../../components/ExportPDF";

const ProductosView = () => {
  const { productos, getProductos, deleteProducto } = useProductoContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProductos, setFilteredProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      await getProductos();
      setLoading(false);
    };

    fetchProductos();
  }, [getProductos, location]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
        p.precio.toString().includes(lowerCaseSearchTerm) ||
        p.stock.toString().includes(lowerCaseSearchTerm)
    );
    setFilteredProductos(filtered);
  }, [searchTerm, productos]);

  const handleDelete = (id) => {
    deleteProducto(id);
  };

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700"
          onClick={() => navigate("/productos/crear")}
        >
          Crear Producto
        </motion.button>
        <ExportPDF
          data={filteredProductos || []}
          columns={["nombre", "precio", "stock", "fechaCarga"]}
          fileName="Lista de Productos"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="h-16 w-16 border-4 border-green-500 border-t-transparent rounded-full"
          ></motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          <table className="table-auto w-full border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Precio</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Fecha de Carga</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.length > 0 ? (
                filteredProductos.map((p) => (
                  <tr key={p.id} className="hover:bg-green-100">
                    <td className="px-4 py-2 border-b">{p.nombre}</td>
                    <td className="px-4 py-2 border-b">{p.precio}</td>
                    <td className="px-4 py-2 border-b">{p.stock}</td>
                    <td className="px-4 py-2 border-b">{p.fechaCarga}</td>{" "}
                    <td className="px-4 py-2 border-b text-center">
                      <div className="flex justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                          onClick={() => navigate(`/productos/editar/${p.id}`)}
                        >
                          Editar
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                          onClick={() => handleDelete(p.id)}
                        >
                          Eliminar
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-green-600 py-4">
                    No hay productos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-green-50">
              <tr>
                <td colSpan="5" className="px-4 py-4">
                  <div className="flex items-center gap-4">
                    <label htmlFor="search" className="text-green-700 font-medium">
                      Buscar:
                    </label>
                    <input
                      id="search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Buscar por nombre, precio o stock"
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default ProductosView;
