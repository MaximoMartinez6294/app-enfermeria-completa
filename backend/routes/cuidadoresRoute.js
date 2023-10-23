const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createCuidador,
  getCuidadores,
  getCuidador,
  deleteCuidador,
  updateCuidador,
} = require("../controllers/cuidadoresController");


router.post("/add-cuidador", protect, createCuidador);
router.patch("/updateCuidador/:id", protect, updateCuidador);
router.get("/", protect, getCuidadores);
router.get("/:id", protect, getCuidador);
router.delete("/:id", protect, deleteCuidador);

module.exports = router;