import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UsersContext";
import ExportPDF from "../../components/ExportPDF";

const UsersView = () => {
  const { user, getUsers, deleteUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await getUsers();
      setLoading(false);
    };

    fetchUsers();
  }, [getUsers, location]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = user.filter(
      (u) =>
        u.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
        u.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        u.edad.toString().includes(lowerCaseSearchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, user]);

  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700"
          onClick={() => navigate("/usuarios/crear")}
        >
          Crear Usuario
        </motion.button>
        <ExportPDF data={filteredUsers || []} columns={["nombre", "email", "edad"]} fileName="Lista de Usuarios" />
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
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Edad</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-green-100">
                    <td className="px-4 py-2 border-b">{u.nombre}</td>
                    <td className="px-4 py-2 border-b">{u.email}</td>
                    <td className="px-4 py-2 border-b">{u.edad}</td>
                    <td className="px-4 py-2 border-b text-center">
                      <div className="flex justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                          onClick={() => navigate(`/usuarios/editar/${u.id}`)}
                        >
                          Editar
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                          onClick={() => handleDelete(u.id)}
                        >
                          Eliminar
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-green-600 py-4">
                    No hay usuarios que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-green-50">
              <tr>
                <td colSpan="4" className="px-4 py-4">
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
                      placeholder="Buscar por nombre, email o edad"
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

export default UsersView;
