const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createEnfermero,
  getEnfermeros,
  getEnfermero,
  deleteEnfermero,
  updateEnfermero,
} = require("../controllers/enfermerosController");


router.post("/add-enfermero", protect, createEnfermero);
router.patch("/updateEnfermero/:id", protect, updateEnfermero);
router.get("/", protect, getEnfermeros);
router.get("/:id", protect, getEnfermero);
router.delete("/:id", protect, deleteEnfermero);

module.exports = router;