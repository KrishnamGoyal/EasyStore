const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignup,
  getAllUsers,
} = require("../controllers/userController");

router.route("/login").post(userLogin);
router.route("/signup").post(userSignup);
router.route("/users").get(getAllUsers);

module.exports = router;
