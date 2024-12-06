const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductbyId,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productContoller");

router.route("/").get(getProducts).post(addProduct);
router
  .route("/:id")
  .get(getProductbyId)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
