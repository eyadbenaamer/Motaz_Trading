import express from "express";
import {
  login,
  getUser,
  getUsers,
  deleteUser,
  getInventory,
  createCargo,
  editICargo,
  deleteCargo,
  getInvoices,
  editInvoice,
  deleteInvoice,
  getTransactions,
  createTransaction,
  editTransaction,
  deleteTransaction,
  getWeeklySummary,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", login);

router.get("/get_user", getUser);

router.get("/get_users", getUsers);

router.delete("/delete_user", deleteUser);

router.get("/get_inventory", getInventory);

router.post("/create_cargo", createCargo);

router.patch("/edit_cargo", editICargo);

router.delete("/delete_cargo", deleteCargo);

router.get("/get_invoices", getInvoices);

router.delete("/delete_invoice", deleteInvoice);

router.get("/get_transactions", getTransactions);

router.post("/create_transaction", createTransaction);

router.patch("/edit_transaction", editTransaction);

router.delete("/delete_transaction", deleteTransaction);

export default router;
