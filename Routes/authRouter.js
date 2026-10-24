const express = require("express");
const router = express.Router();
const {
  registerFarmer,
  loginFarmer,
  getAll,
  getById,
  userDelete,
  updateData,
} = require("../Controller/authController");

router.post("/register", registerFarmer);
router.post("/login", loginFarmer);
router.get("/farmers", getAll);
router.get("/farmers/:id",getById);
router.delete("/delete/:id",userDelete);
router.put("/update/:id",updateData);

module.exports = router;
