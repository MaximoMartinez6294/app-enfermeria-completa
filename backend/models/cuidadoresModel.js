const mongoose = require("mongoose");

const cuidadoresSchema = mongoose.Schema(
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
    telefono: {
      type: String,
      required: [true, "Porfavor agrega un telefono"],
      trim: true,
    },
    observaciones: {
      type: String,
      required: [true, "Porfavor agrega observaciones"],
      trim: true,
    },
    paciente: {
      type: String,
      required: [true, "Porfavor agrega un paciente"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cuidador = mongoose.model("Cuidadores", cuidadoresSchema);
module.exports = Cuidador;