const users = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWTPASSWORD;

exports.userRegisterController = async (req, res) => {
  console.log("inside registerController");
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(406).json("User already exists. Please login!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new users({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json(newUser);
  } catch (err) {
    res.status(401).json(err.message);
  }
};

exports.userLoginController = async (req, res) => {
  console.log("inside loginController");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(404).json("Invalid email or password");
    }

    const token = jwt.sign({ userId: existingUser._id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ users: existingUser, token });
  } catch (err) {
    res.status(401).json(err.message);
  }
};

exports.allUsersController = async (req, res) => {
  console.log("Inside allUsersController");
  try {
    const allUsers = await users.find().select('-password');
    if (allUsers.length > 0) {
      res.status(200).json(allUsers);
    } else {
      res.status(404).json("No users found");
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.userDetailsController = async (req, res) => {
  console.log("Inside userDetailsController");
  try {
    const user = await users.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
