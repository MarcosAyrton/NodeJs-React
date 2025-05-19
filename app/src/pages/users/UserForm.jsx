import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UsersContext";

const UserForm = () => {
  const { createUser, editUser, getUserById } = useUserContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ nombre: "", email: "", edad: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setIsEditing(true);
        try {
          const user = await getUserById(id);
          setFormData({
            nombre: user.nombre || "",
            email: user.email || "",
            edad: user.edad || "",
          });
        } catch (error) {
          console.error("Error al cargar los datos del usuario:", error);
        }
      }
    };
    fetchUser();
  }, [id, getUserById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await editUser(id, formData);
    } else {
      await createUser(formData);
    }
    navigate("/usuarios");
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
          {isEditing ? "Editar Usuario" : "Crear Usuario"}
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
              placeholder="Ingrese el nombre"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingrese el email"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 font-medium mb-2">Edad</label>
            <input
              type="number"
              name="edad"
              value={formData.edad || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingrese la edad"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all shadow-lg"
          >
            {isEditing ? "Actualizar Usuario" : "Crear Usuario"}
          </motion.button>
        </form>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/usuarios")}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-all shadow-lg"
        >
          Cancelar
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UserForm;
