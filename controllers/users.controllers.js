const Usuario = require('../models/Usuario');

// GET: todos los usuarios
const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json({ data: usuarios, status: 200, message: "Usuarios obtenidos correctamente" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al obtener usuarios", error });
  }
};

// GET: un usuario por ID
const getOneUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
    }
    res.json({ status: 200, message: "Usuario encontrado", data: usuario });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al obtener usuario", error });
  }
};

// POST: crear usuario
const createUser = async (req, res) => {
  try {
    const { nombre, email, edad } = req.body;
    const nuevoUsuario = await Usuario.create({ nombre, email, edad });
    res.status(201).json({ status: 201, message: "Usuario creado correctamente", data: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al crear usuario", error });
  }
};

// PUT: actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { nombre, email, edad } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
    }
    await usuario.update({ nombre, email, edad });
    res.json({ status: 200, message: "Usuario actualizado correctamente", data: usuario });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al actualizar usuario", error });
  }
};

// DELETE: eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
    }
    await usuario.destroy();
    res.json({ status: 200, message: `Usuario con ID ${req.params.id} eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al eliminar usuario", error });
  }
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
