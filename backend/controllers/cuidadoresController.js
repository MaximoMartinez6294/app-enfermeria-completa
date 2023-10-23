const asyncHandler = require("express-async-handler");
const Cuidadores = require("../models/cuidadoresModel");
const mongoose = require("mongoose");


// Controlador para crear un cuidador
const createCuidador = asyncHandler(async (req, res) => {

  // Extrae los datos del cuerpo de la solicitud
  const {
    name,
    telefono,
    observaciones,
    paciente,
  } = req.body;

  console.log("Datos recibidos en la solicitud POST:", req.body);
  // Validación: Comprueba si los campos requeridos están en blanco
  if (
    !name || !name.trim() ||
    !telefono || !telefono.trim() ||
    !observaciones || !observaciones.trim() ||
    !paciente || !paciente.trim()
  ) {
    res.status(400);
    throw new Error("Rellena todos los campos");
  }

  // Crea el cuidador
  const cuidador = await Cuidadores.create({
    user: req.user.id, // contiene el ID del usuario que realiza la solicitud
    name,
    telefono,
    observaciones,
    paciente,
  });

  // Envía una respuesta con el producto creado y un código de respuesta 201 (Created)
  res.status(201).json(cuidador);
});


// Get all Products
const getCuidadores = asyncHandler(async (req, res) => {
  const cuidador = await Cuidadores.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(cuidador);
});


// Get single product
/*
const getProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  // Verifica si productId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  const product = await Product.findById(productId);
});*/
// Get single product

const getCuidador = asyncHandler(async (req, res) => {
  const cuidador = await Cuidadores.findById(req.params.id);
  
  // if product doesnt exist
  if (!cuidador) {
    res.status(404);
    throw new Error("Cuidador no encontrado");
  }
  // Match product to its user
  if (cuidador.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Cuidador no encontrado");
  }
  res.status(200).json(cuidador);
});

// Delete Cuidador
const deleteCuidador = asyncHandler(async (req, res) => {
  const cuidador = await Cuidadores.findById(req.params.id);
  // if product doesnt exist
  if (!cuidador) {
    res.status(404);
    throw new Error("Cuidador no encontrado");
  }
  // Match product to its user
  if (cuidador.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Cuidador no encontrado");
  }
  await cuidador.deleteOne();
  res.status(200).json({ message: "Cuidador eliminado" });
});

// Update Product
const updateCuidador = asyncHandler(async (req, res) => {
  const { name,
    telefono,
    observaciones,
    paciente,
    } = req.body;
  const { id } = req.params;

  const cuidador = await Cuidadores.findById(id);

  // if product doesnt exist
  if (!cuidador) {
    res.status(404);
    throw new Error("Cuidador no encontrado");
  }
  // Match product to its user
  if (cuidador.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Cuidador no encontrado");
  }



  // Update Product
  const updateCuidador = await Cuidadores.findByIdAndUpdate(
    { _id: id },
    {
     name,
     telefono,
     observaciones,
     paciente,
  
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updateCuidador);
});

module.exports = {
  createCuidador,
  getCuidadores,
  getCuidador,
  deleteCuidador,
  updateCuidador,
};