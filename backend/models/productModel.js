const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Porfavor agrega un nombre"],
      trim: true,
    },
    estado: {
      type: String,
      required: [true, "Porfavor agrega un estado"],
      trim: true,
    },
    direccion: {
      type: String,
      required: [true, "Porfavor agrega una direccion"],
      trim: true,
    },
    telefono: {
      type: String,
      required: [true, "Porfavor agrega un telefono"],
      trim: true,
    },

    horasDeCuidador: {
      type: String,
      required: [true, "Porfavor agrega horas de cuidador"],
      trim: true,
    },
    turnos: {
      type: String,
      required: [true, "Porfavor agrega turnos"],
      trim: true,
    },
    cuidadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuidadores',
        name: String
      }
    ],
    ved: {
      type: String,
      required: [true, "Porfavor agrega ved"],
      trim: true,
    },
    enfermeros: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enfermeros',
        name: String
      }
    ],
    observaciones: {
      type: String,
      required: [true, "Porfavor agrega observaciones"],
      trim: true,
    },
    insumos: {
      type: String,
      required: [true, "Porfavor agrega insumos"],
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model("Product", productSchema);
module.exports = Product;