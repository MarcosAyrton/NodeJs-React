import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [user, setUsers] = useState([]);

  const APIFetch = "http://localhost:3000/api";

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${APIFetch}/getUsuarios`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  }, [APIFetch]);

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`${APIFetch}/getUsuarios/${id}`);
      const { nombre, email, edad } = response.data.data;
      return { nombre, email, edad };
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw new Error("Error al obtener el usuario: " + error.message);
    }
  };

  const createUser = async (user) => {
    try {
      const response = await axios.post(`${APIFetch}/createUsuario`, user);
      console.log("Usuario creado:", response.data);
      await getUsers();
    } catch (error) {
      console.error("Ocurrió un error al crear el usuario:", error);
    }
  };

  const editUser = async (id, updatedUser) => {
    try {
      await axios.put(`${APIFetch}/updateUsuario/${id}`, updatedUser);
      await getUsers();
      setMessage("Usuario actualizado con éxito");
    } catch (error) {
      setMessage(`Ocurrió un error al actualizar el usuario: ${error.message}`);
      console.error("Error al realizar el PUT:", error);
    }
  };

  const deleteUser = async (id) => {
    console.log("ID para eliminar:", id);

    if (!id) {
      setMessage("No hay un ID proporcionado para eliminar.");
      return;
    }

    try {
      await axios.delete(`${APIFetch}/deleteUsuario/${id}`);
      setUsers((prevUsers) => {
        if (!Array.isArray(prevUsers)) {
          console.error("prevUsers is not an array:", prevUsers);
          return [];
        }
        return prevUsers.filter((user) => user.id !== id);
      });
      setMessage(`El usuario con ID ${id} fue eliminado exitosamente.`);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      setMessage(`Ocurrió un error: ${error.message}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUsers,
        getUsers,
        getUserById,
        createUser,
        editUser,
        deleteUser,
        message,
        setMessage,
        nombre,
        setNombre,
        email,
        setEmail,
        edad,
        setEdad,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
