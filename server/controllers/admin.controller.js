import jwt from "jsonwebtoken";
import { unlinkSync } from "fs";

import Cargo from "../models/Cargo.js";
import Invoice from "../models/Invoice.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (
    !(
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    )
  ) {
    return res.status(401).json({ message: "تسجيل دخول خاطئ." });
  }
  const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
  res.cookie("token", token, { maxAge: 500000, signed: true });

  return res.status(200).json({
    token,
  });
};

export const getUser = async (req, res) => {
  let { user } = req;
  const { _id, name, username, email, balance, picture, createdAt } = user;
  return res
    .status(200)
    .json({ _id, name, username, email, balance, picture, createdAt });
};

export const getUsers = async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const pageSize = 20;
  const users = await User.find()
    .sort({ name: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const totalUsers = await User.countDocuments();
  const pagesCount = Math.ceil(totalUsers / pageSize);

  return res.status(200).json({ users, pagesCount });
};

// TODO:
export const createUser = async (req, res) => {
  const { name, username, email } = req.body;
  const { file } = req;
  const user = await User.create({ name, username, email });
  if (file) {
    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({ message: "هذا الملف غير مدعوم." });
    }

    user.picture = `${process.env.API_URL}/storage/${file.filename}`;
  }

  await user.save();
  return res.status(200).json(user);
};

export const editUser = async (req, res) => {
  const { user } = req;
  const { name, username, email, isVerified } = req.body;
  const { file } = req;
  user.name = name ?? user.name;
  user.username = username ?? user.username;
  user.email = email ?? user.email;

  if (typeof isVerified === "boolean") {
    user.verificationStatus.isVerified = isVerified;
  }

  if (file) {
    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({ message: "هذا الملف غير مدعوم." });
    }

    user.picture = `${process.env.API_URL}/storage/${file.filename}`;
  }

  await user.save();
  return res.status(200).json({ message: "تم تعديل المستخدم بنجاح." });
};

export const deleteUser = async (req, res) => {
  const { user } = req;
  const picture = user.picture.split("/").reverse()[0];
  try {
    unlinkSync(`./public/storage/${picture}`);
  } catch (err) {
    console.log(err);
  }

  await user.deleteOne();
  return res.status(200).json("تم حذف المستخدم بنجاح");
};

export const getInventory = async (req, res) => {
  const { user } = req;

  let { location, page } = req.query;

  if (!page) {
    page = 1;
  }

  if (
    !(
      location === "guangzhou" ||
      location === "benghazi" ||
      location === "misurata"
    )
  ) {
    return res.status(400).json({ message: "bad request" });
  }

  const inventory = user.inventories[location];

  const firstIndex = (page - 1) * 10;
  const lastIndex = (page - 1) * 10 + 10;

  const pagesCount = Math.ceil(inventory.length / 10);

  return res.status(200).json({
    inventory: inventory.slice(firstIndex, lastIndex),
    pagesCount,
    count: inventory.length,
  });
};

export const createCargo = async (req, res) => {
  const { user } = req;
  const { location, size, url, containerId, providerUrl } = req.body;
  const createdAt = Date.now();

  if (
    !(
      location === "guangzhou" ||
      location === "benghazi" ||
      location === "misurata"
    )
  ) {
    return res.status(400).json({ message: "bad request" });
  }

  const cargo = new Cargo({
    size,
    url,
    providerUrl,
    containerId,
    createdAt,
  });

  user.inventories[location].unshift(cargo);

  await user.save();

  return res.status(201).json(cargo);
};

export const editICargo = async (req, res) => {
  const { user } = req;
  const { _id, size, url, providerUrl, containerId, location } = req.body;
  console.log(location === "guangzhou");
  if (
    !(
      location === "guangzhou" ||
      location === "benghazi" ||
      location === "misurata"
    )
  ) {
    return res.status(400).json({ message: "bad request" });
  }
  const cargo = user.inventories[location].id(_id);

  if (!cargo) {
    return res.status(404).json({ message: "لم يتم العثور على الشحنة." });
  }

  if (size) {
    cargo.size = size;
  }
  if (size) {
    cargo.url = url;
  }
  if (providerUrl) {
    cargo.providerUrl = providerUrl;
  }
  if (containerId) {
    cargo.containerId = containerId;
  }
  await user.save();

  return res.status(200).json(cargo);
};

export const deleteCargo = async (req, res) => {
  const { user } = req;
  let { cargoId, location, currentPage } = req.query;

  if (
    !(
      location === "guangzhou" ||
      location === "benghazi" ||
      location === "misurata"
    )
  ) {
    return res.status(400).json({ message: "bad request" });
  }

  const cargo = user.inventories[location].id(cargoId);

  if (!cargo) {
    return res.status(404).json({ message: "لم يتم العثور على الشحنة." });
  }

  cargo.deleteOne();

  currentPage = Number(currentPage);
  const cargoList = user.inventories[location].slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  await user.save();
  return res.status(200).json({ message: "تم حذف الشحنة بنجاح.", cargoList });
};

export const getInvoice = async (req, res) => {
  const { user } = req;
  const { invoiceId } = req.query;

  const invoice = user.invoices.id(invoiceId);

  if (!invoice) {
    return res.status(404).json({ message: "لم يتم العثور على الفاتورة." });
  }

  return res.status(200).json(invoice);
};

export const getInvoices = async (req, res) => {
  const { user } = req;
  let { page } = req.query;

  if (!page) {
    page = 1;
  }

  const firstIndex = (page - 1) * 10;
  const lastIndex = (page - 1) * 10 + 10;
  const invoices = user.invoices.slice(firstIndex, lastIndex);

  const pagesCount = Math.ceil(user.invoices.length / 10);

  return res.status(200).json({ invoices, pagesCount });
};

export const createInvoice = async (req, res) => {
  const { user } = req;
  const { files } = req;
  let { amount, details, status, payment } = req.body;

  amount = Number(amount);
  if (!amount) {
    return res.status(400).json({ message: "القيمة غير صحيحة." });
  }
  const transaction = new Transaction({
    amount,
    createdAt: Date.now(),
    balance: user.balance - amount,
    details: `خصم قيمة فاتورة`,
  });
  const invoice = new Invoice({
    amount,
    details,
    status,
    payment,
    transactionId: transaction,
    createdAt: Date.now(),
  });

  files?.map((file) => {
    invoice.attachments.push({
      name: file.filename,
      url: `${process.env.API_URL}/storage/${file.filename}`,
    });
  });

  user.balance -= amount;
  user.transactions.unshift(transaction);
  user.invoices.unshift(invoice);
  await user.save();
  return res.status(200).json(invoice);
};

export const editInvoice = async (req, res) => {
  const { user } = req;
  let { _id, amount, status, payment } = req.body;
  amount = Number(amount);

  const invoice = user.invoices.id(_id);

  if (!invoice) {
    return res.status(404).json({ message: "لم يتم العثور على الفاتورة." });
  }

  if (amount) {
    const difference = invoice.amount - amount;
    invoice.amount = amount;
    const transaction = user.transactions.id(invoice.transactionId);
    user.balance += difference;
    transaction.amount = amount;
    transaction.balance += difference;
  }

  if (payment === "not paid" || payment === "paid") {
    invoice.payment = payment;
  }

  if (status) {
    invoice.status = status;
  }
  invoice.attachments.map((file) => {
    try {
      const isInList = req.files.find((item) => item.filename === file.name);
      if (!isInList) {
        unlinkSync(`./public/storage/${file.name}`);
      }
    } catch {}
  });
  invoice.attachments = [];

  if (req.files) {
    req.files.map((file) =>
      invoice.attachments.push({
        name: file.filename,
        url: `${process.env.API_URL}/storage/${file.filename}`,
      })
    );
  }

  await user.save();
  return res.status(200).json({ message: "تم تعديل الفاتورة بنجاح." });
};

export const deleteInvoice = async (req, res) => {
  const { user } = req;
  let { invoiceId, currentPage } = req.query;

  const invoice = user.invoices.id(invoiceId);

  if (!invoice) {
    return res.status(404).json({ message: "لم يتم العثور على الفاتورة." });
  }

  invoice.attachments?.map((file) => {
    try {
      unlinkSync(`./public/storage/${file.name}`);
    } catch {}
  });

  await invoice.deleteOne();
  await user.save();
  currentPage = Number(currentPage);
  const invoicesList = user.invoices.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  return res
    .status(200)
    .json({ message: "تم حذف الفاتورة بنجاح.", invoicesList });
};

export const getTransactions = async (req, res) => {
  const { user } = req;
  let { page } = req.query;

  if (!page) {
    page = 1;
  }

  const firstIndex = (page - 1) * 10;
  const lastIndex = (page - 1) * 10 + 10;
  const transactions = user.transactions.slice(firstIndex, lastIndex);

  const pagesCount = Math.ceil(user.transactions.length / 10);

  return res.status(200).json({ transactions, pagesCount });
};

export const createTransaction = async (req, res) => {
  const { user } = req;
  let { amount, details } = req.body;

  amount = Number(amount);
  if (!amount) {
    return res.status(400).json({ message: "المبلغ غير صحيح." });
  }

  const transaction = new Transaction({
    amount,
    details,
    type: amount > 0 ? "deposit" : "withdraw",
    balance: user.balance + amount,
    createdAt: Date.now(),
  });

  user.balance += amount;
  user.transactions.unshift(transaction);

  await user.save();
  return res.status(201).json(transaction);
};

export const editTransaction = async (req, res) => {
  const { user } = req;
  let { _id, amount, details, type } = req.body;

  const transaction = user.transactions.id(_id);

  if (!transaction) {
    return res.status(404).json({ message: "لم يتم العثور على المعاملة." });
  }

  if (amount) {
    amount = Number(amount);
    if (!amount) {
      return res.status(400).json({ message: "المبلغ غير صحيح." });
    }
    user.balance -= transaction.amount;
    user.balance += amount;
    transaction.amount = amount;
    transaction.balance = user.balance;
    if (amount > 0) {
      transaction.type = "deposit";
    } else {
      transaction.type = "withdraw";
    }
  }
  if (details) {
    transaction.details = details;
  }
  await user.save();

  return res.status(200).json({ message: "تم تعديل المعاملة بنجاح." });
};

export const deleteTransaction = async (req, res) => {
  const { user } = req;
  let { transactionId, currentPage } = req.query;
  const transaction = user.transactions.id(transactionId);

  if (!transaction) {
    return res.status(404).json({ message: "لم يتم العثور على المعاملة." });
  }

  transaction.deleteOne();
  await user.save();

  currentPage = Number(currentPage);
  const transactionsList = user.transactions.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  return res
    .status(200)
    .json({ message: "تم حذف المعاملة بنجاح.", transactionsList });
};

// user

export const getWeeklySummary = async (req, res) => {
  const { _id } = req.query;
};
