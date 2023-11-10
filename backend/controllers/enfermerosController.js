const asyncHandler = require("express-async-handler");
const Enfermeros = require("../models/enfermerosModel");
const mongoose = require("mongoose");


// Controlador para crear un cuidador
const createEnfermero = asyncHandler(async (req, res) => {

  // Extrae los datos del cuerpo de la solicitud
  const {
    name,
    telefono,
    paciente,
  } = req.body;

  console.log("Datos recibidos en la solicitud POST:", req.body);
  // Validación: Comprueba si los campos requeridos están en blanco
  if (
    !name || !name.trim() ||
    !telefono || !telefono.trim() ||
    !paciente || !paciente.trim()
  ) {
    res.status(400);
    throw new Error("Rellena todos los campos");
  }

  // Crea el cuidador
  const enfermero = await Enfermeros.create({
    user: req.user.id, // contiene el ID del usuario que realiza la solicitud
    name,
    telefono,
    paciente,
  });

  // Envía una respuesta con el producto creado y un código de respuesta 201 (Created)
  res.status(201).json(enfermero);
});


// Get all Products
const getEnfermeros = asyncHandler(async (req, res) => {
  const enfermero = await Enfermeros.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(enfermero);
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

const getEnfermero = asyncHandler(async (req, res) => {
  const enfermero = await Enfermeros.findById(req.params.id);
  
  // if Enfermero doesnt exist
  if (!enfermero) {
    res.status(404);
    throw new Error("Enfermero no encontrado");
  }
  // Match Enfermero to its user
  if (enfermero.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Enfermero no encontrado");
  }
  res.status(200).json(enfermero);
});

// Delete Enfermero
const deleteEnfermero = asyncHandler(async (req, res) => {
  const enfermero = await Enfermeros.findById(req.params.id);
  // if Enfermero doesnt exist
  if (!enfermero) {
    res.status(404);
    throw new Error("Enfermero no encontrado");
  }
  // Match Enfermero to its user
  if (enfermero.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Enfermero no encontrado");
  }
  await enfermero.deleteOne();
  res.status(200).json({ message: "Enfermero eliminado" });
});

// Update Enfermero
const updateEnfermero = asyncHandler(async (req, res) => {
  const { name,
    telefono,
    paciente,
    } = req.body;
  const { id } = req.params;

  const enfermero = await Enfermeros.findById(id);

  // if Enfermero doesnt exist
  if (!enfermero) {
    res.status(404);
    throw new Error("Enfermero no encontrado");
  }
  // Match Enfermero to its user
  if (enfermero.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Enfermero no encontrado");
  }



  // Update Enfermero
  const updateEnfermero = await Enfermeros.findByIdAndUpdate(
    { _id: id },
    {
     name,
     telefono,
     paciente,
  
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updateEnfermero);
});

module.exports = {
  createEnfermero,
  getEnfermeros,
  getEnfermero,
  deleteEnfermero,
  updateEnfermero,
};