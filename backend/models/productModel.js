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
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    estado: {
      type: String,
      required: [true, "Porfavor agrega un estado"],
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
    cuidadores: {
      type: String,
      required: [true, "Porfavor agrega cuidadores"],
      trim: true,
    },
    ved: {
      type: String,
      required: [true, "Porfavor agrega ved"],
      trim: true,
    },
    enfermeros: {
      type: String,
      required: [true, "Porfavor agrega enfermeros"],
      trim: true,
    },
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