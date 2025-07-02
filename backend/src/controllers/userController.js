import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../models/usermodel.js";
import { Meeting } from "../models/meetingmodel.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid username or password" });
    }

    // ✅ Generate secure token using crypto
    const token = crypto.randomBytes(20).toString("hex");

    // Save token in DB (for user session or tracking)
    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Login failed" });
  }
};

const register = async (req, res) => {
  // console.log(req.body);
  const { name, username, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.FOUND).json({
        message: "Username already exists",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(httpStatus.CREATED).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong during registration",
    });
  }
};

const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token: token });
    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
    const user = await User.findOne({ token: token });

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    res.status(httpStatus.CREATED).json({ message: "Added code to history" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

export { register, login, getUserHistory, addToHistory };
