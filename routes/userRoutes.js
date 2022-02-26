const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

//Signup
router.post("/", registerUser);
//Login
router.post("/login", loginUser);
//Fetch User List
router.get("/", protect, getUsers);
//Fetch User Details*
router.get("/:id", protect, getUser);
module.exports = router;
