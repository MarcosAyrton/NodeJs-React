import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      setShowModal(true);
    } else {
      setName(storedName);
    }
  }, []);

  const handleSaveName = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name);
      setShowModal(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-100">
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">¡Buenos días!</h2>
              <p className="text-green-600 mb-4 text-center">¿Con quién voy a estar trabajando hoy?</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ingrese su nombre"
              />
              <button
                onClick={handleSaveName}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
              >
                Guardar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!showModal && (
        <>
          <h1 className="text-4xl font-bold text-green-700">Bienvenido, {name}!</h1>
          <p className="mt-4 text-lg text-green-600">En esta pagina podras utilizar un CRUD de usuarios y productos.</p>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="mt-8">
            <Link to="/usuarios" className="px-4 py-2 text-white bg-green-600 rounded shadow-lg hover:bg-green-700">
              Ir a Usuarios
            </Link>
          </motion.div>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="mt-4">
            <Link to="/productos" className="px-4 py-2 text-white bg-green-600 rounded shadow-lg hover:bg-green-700">
              Ir a Productos
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Home;
