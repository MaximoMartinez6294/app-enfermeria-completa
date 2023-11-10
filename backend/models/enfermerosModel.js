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

const Enfermero = mongoose.model("Enfermeros", cuidadoresSchema);
module.exports = Enfermero;