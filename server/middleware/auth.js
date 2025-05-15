import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).json("login first");
    }
    if (token.startsWith("Bearer ")) {
      token = token.trimStart().slice(7);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json("invalid token or user doesn't exist");
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "انتهت الجلسة. يرجى تسجيل الدخول مجددًا." });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.path === "/login") {
    return next();
  }
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).json("login first");
    }
    if (token.startsWith("Bearer ")) {
      token = token.trimStart().slice(7);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.isAdmin) {
      return res.status(401).json("invalid token");
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "انتهت الجلسة. يرجى تسجيل الدخول مجددًا." });
  }
};

export const getUser = async (req, res, next) => {
  if (req.path === "/login" || req.path.startsWith("/get_users")) {
    return next();
  }
  const { _id } = req.query;
  const user = await User.findById(_id);
  if (!user) {
    return res.status(404).json({ message: "لم يتم العثور على المستخدم" });
  }
  req.user = user;
  next();
};
