import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { generateCode } from "../utils/generateCode.js";

import { verifyCode } from "../utils/sendEmail.js";

/*REGISTER USER*/

export const signup = async (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();
  email = email.trim().toLowerCase();
  if (!(name && email && password)) {
    return res.status(400).json({ message: "املأ الحقول المطلوبة." });
  }
  const isEmailUsed = (await User.findOne({ email })) ? true : false;
  if (isEmailUsed) {
    return res
      .status(409)
      .json({ message: "هذا البريد الإلتكروني مُسجّل مسبقًا." });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    createdAt: Date.now(),
    password: hashedPassword,
  });
  const verificationCode = generateCode(6);
  const verificationToken = jwt.sign(
    { id: newUser._id, verificationCode },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );
  // sends the verification code to the user's email address
  await verifyCode(email, verificationCode, verificationToken);
  newUser.verificationStatus.verificationToken = verificationToken;
  await newUser.save();

  return res.status(201).send("تم إنشاء الحساب بنجاح.");
};
export const checkEmailForRegister = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "هذا البريد الإلتكروني مُسجّل مسبقًا." });
  } else {
    res.status(200).json({ message: "هذا البريد الإلتكروني متاح للتسجيل." });
  }
};

export const checkEmailForResetPassword = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (user) {
    res.status(200).json({ message: "هذا البريد الإلتكروني مُسجّل مسبقًا." });
  } else {
    res
      .status(409)
      .json({ message: "لا يرتبط هذا البريد الإلكتروني بأي حساب." });
  }
};

/*LOGIN USER*/
export const login = async (req, res) => {
  let { email, password } = req.body;
  email = email.trim().toLowerCase();

  if (!password && !email) {
    return res.status(400).json({ message: "تسجيل دخول خاطئ." });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "لا يوجد مستخدم لهذا البريد الإلتكروني." });
  }
  if (!password && email) {
    return res.status(400).json({ message: "ادخل كلمة المرور." });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "كلمة المرور غير صحيحة." });
  }
  const isVerified = user.verificationStatus.isVerified;
  if (!isVerified) {
    const verificationCode = generateCode(6);
    const verificationToken = jwt.sign(
      { id: user.id, verificationCode },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );
    user.verificationStatus.verificationToken = verificationToken;
    // send email with verification code if the email isn't verified
    await verifyCode(email, verificationCode, verificationToken);
    await user.save();
    return res.status(401).json({
      isVerified,
      message: "يُرجى إكمال التحقق من الحساب.",
    });
  }
  /*
    if the email is verified and it's correct as well as the password,
    then a token will be created and returned to the user
    */
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
  res.cookie("token", token, { maxAge: 500000, signed: true });

  const cargoCount =
    user.inventories.guangzhou?.length +
    user.inventories.benghazi?.length +
    user.inventories.misurata?.length;

  return res.status(200).json({
    profile: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      balance: user.balance,
      picture: user.picture,
      createdAt: user.createdAt,
      cargoCount,
    },
    isVerified,
    token,
  });
};
export const loginWithToken = async (req, res) => {
  if (req.header("Authorization")) {
    let token = req.header("Authorization");
    if (token.startsWith("Bearer ")) {
      token = token.trimStart().slice(7);
    }
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userInfo.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const cargoCount =
      user.inventories.guangzhou?.length +
      user.inventories.benghazi?.length +
      user.inventories.misurata?.length;

    return res.status(200).json({
      profile: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        balance: user.balance,
        picture: user.picture,
        createdAt: user.createdAt,
        cargoCount,
      },
    });
  }
};
export const verifyAccountByCode = async (req, res) => {
  const { email, code } = req.body;
  if (!code) {
    return res.status(400).json({ message: "ادخل رمز التحقق." });
  }
  if (!email) {
    return res.status(400).json({ message: "أدخل البريد الإلكتروني." });
  }
  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    return res.status(404).json({ message: "لا يوجد مستخدم." });
  }
  if (user.verificationStatus.isVerified) {
    return res.status(400).send("تم التحقق مسبقًا.");
  }
  /*
      verify the verification code by the token that was created and associated with the code 
      and stored in the database "user.verificationStatus.verificationToken"
      when the user requested for email verification
      */
  try {
    const userInfo = jwt.verify(
      user.verificationStatus.verificationToken,
      process.env.JWT_SECRET
    );
    if (userInfo.verificationCode !== code) {
      return res.status(401).json({ message: "رمز التحقق خاطئ." });
    }
    user.verificationStatus.isVerified = true;
    user.verificationStatus.verificationToken = null;
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    const cargoCount =
      user.inventories.guangzhou?.length +
      user.inventories.benghazi?.length +
      user.inventories.misurata?.length;

    return res.status(200).json({
      profile: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        balance: user.balance,
        picture: user.picture,
        createdAt: user.createdAt,
        cargoCount,
      },
      isVerified: true,
      token,
    });
  } catch {
    return res.status(401).json({ message: "jwt expired" });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  if (!token) {
    return res.status(400).send("Bad request");
  }
  if (!password) {
    return res.status(400).json({ message: "كلمة المرور مطلوبة." });
  }
  try {
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(tokenInfo.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (user.resetPasswordToken === null) {
      return res.status(400).send("Bad Request.");
    }
    if (user.resetPasswordToken !== token) {
      return res.status(401).json({ message: "Invalid token." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.verificationStatus.isVerified = true;
    delete user.resetPasswordToken;
    await user.save();

    const loginToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    const cargoCount =
      user.inventories.guangzhou?.length +
      user.inventories.benghazi?.length +
      user.inventories.misurata?.length;

    return res.status(200).json({
      profile: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        balance: user.balance,
        picture: user.picture,
        createdAt: user.createdAt,
        cargoCount,
      },
      isVerified: true,
      token: loginToken,
    });
  } catch {
    return res
      .status(401)
      .json({ message: "Link is expired.", isExpired: true });
  }
};

export const sendVerificationCode = async (req, res) => {
  let { type, email } = req.body;
  email = email.trim().toLowerCase();
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  const verificationCode = generateCode(6);
  const token = jwt.sign(
    { id: user.id, verificationCode },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );
  if (type === "reset_password") {
    await verifyCode(email, verificationCode, token);
    user.resetPasswordToken = token;
    user.save();
    return res
      .status(200)
      .json({ message: `We have sent a verification code to ${email}.` });
  } else if (type === "verify_account") {
    await verifyCode(email, verificationCode);
    if (user.verificationStatus.isVerified) {
      return res.status(400).send("تم التحقق مسبقًا.");
    }
    user.verificationStatus.verificationToken = token;
    user.save();
    return res.status(200).json({ message: "تم إرسال رمز التحقق." });
  } else {
    return res.status(400).send("Bad request");
  }
};

export const verifyResetPasswordCode = async (req, res) => {
  let { code, email } = req.body;
  email = email.trim().toLowerCase();
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json("Bad Request");
  }
  try {
    const tokenInfo = jwt.verify(
      user.resetPasswordToken,
      process.env.JWT_SECRET
    );
    if (tokenInfo.verificationCode !== code) {
      return res.status(401).json({ message: "Invalid code." });
    }
    return res.status(200).json({ token: user.resetPasswordToken });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "jwt expired" });
  }
};
