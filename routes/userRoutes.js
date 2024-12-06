const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const {
  userLogin,
  userSignup,
  getAllUsers,
  userLogout,
} = require("../controllers/userController");

router.route("/login").post(userLogin);
router.route("/signup").post(userSignup);
router.route("/logout").post(authMiddleware, userLogout);
router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;
