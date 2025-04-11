import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(500).json({ message: "Please login" });
    }

    const decodedData = jwt.verify(token, process.env.jwt_sec);

    req.user = await User.findById(decodedData._id);

    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(500).json({ message: "Login first" });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not admin" });
    }
    // If admin, proceed to next
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
