const User = require("../Models/User.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// registerUser
const registerFarmer = async (req, res) => {
  try {
    const { name, email, phone, password, role, language } = req.body;
    if (!name || !email || !phone || !password || !role || !language) {
      return res.status(400).json({
        msg: "All Fields are required!",
      });
    }

    const existuser = await User.findOne({ $or: [{ email }, { password }] });
    if (existuser) {
      return res.status(400).json({
        msg: "User Already exist for this email.",
      });
    }

    // password Hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      language,
      role,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.status(201).json({
      msg: "Farmer Register Successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        language: user.language,
        password: user.password,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error!",
      error: error.message,
    });
  }
};

// Login User

const loginFarmer = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        msg: "Fields are required!",
      });
    }

    // const query = email ? { email } : { phone };
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "User not Found please Register!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Wrong Password!",
      });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(201).json({
      msg: "User Login Successfull",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        language: user.language,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// getAll Farmers
const getAll = async (req, res) => {
  try {
    const users = await User.find({ role: "farmer" });
    if (!users) {
      return res.status(404).json({
        msg: "User Not Found!",
      });
    }

    return res.status(200).json({
      msg: "Get All Farmers",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

// getById

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    if (!users || users.role !== "farmer") {
      return res.status(404).json({
        msg: "User Not Found!",
      });
    }

    return res.status(200).json({
      msg: "User Get By Id",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete

const userDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findByIdAndDelete(id);
    if (!users) {
      return res.status(404).json({
        msg: "User not Found!",
      });
    }
    return res.status(200).json({
      msg: "user Delete Successfully",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        msg: "Invalid User Id!",
      });
    }

    const { name, email, phone, password, language } = req.body;
  

    const user = await User.findByIdAndUpdate(id,{ $set: { name, email, phone, password, language }},{ new: true, runValidators: true });


    if (!user) {
      return res.status(404).json({
        msg: "User Not Found!",
      });
    }

    return res.status(200).json({
      msg: "DataUpdate Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        language: user.language,
        password: user.password,
      },
    });


  } catch (error) {
    console.log(error);
    
    }
};
module.exports = {
  registerFarmer,
  loginFarmer,
  getAll,
  getById,
  userDelete,
  updateData,
};
