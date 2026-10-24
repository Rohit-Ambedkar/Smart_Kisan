const express = require("express");
const router = express.Router();
const {
  registerFarmer,
  loginFarmer,
  getAll,
  getById,
  userDelete,
} = require("../Controller/authController");

router.post("/register", registerFarmer);
router.post("/login", loginFarmer);
router.get("/farmers", getAll);
router.get("/farmers/:id",getById);
router.delete("/delete/:id",userDelete);

module.exports = router;
