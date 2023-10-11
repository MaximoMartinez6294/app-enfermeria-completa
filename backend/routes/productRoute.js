const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");


router.post("/add-product", protect, createProduct);
router.patch("/updateProduct/:id", protect, updateProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;