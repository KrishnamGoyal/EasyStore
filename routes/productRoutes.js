const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getProducts,
  getProductbyId,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productContoller");

router
  .route("/")
  .get(authMiddleware, adminMiddleware, getProducts)
  .post(authMiddleware, adminMiddleware, addProduct);
router
  .route("/:id")
  .get(getProductbyId)
  .put(authMiddleware, adminMiddleware, updateProduct)
  .delete(authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
