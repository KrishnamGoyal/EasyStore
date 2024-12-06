const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

const {
  addtoCart,
  getCart,
  updateCartItem,
  deletefromCart,
} = require("../controllers/cartController");

router.route("/").post(authMiddleware, addtoCart).get(authMiddleware, getCart);

router
  .route("/:productId")
  .put(authMiddleware, updateCartItem)
  .delete(authMiddleware, deletefromCart);

module.exports = router;
