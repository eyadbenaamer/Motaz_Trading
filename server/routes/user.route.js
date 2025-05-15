import express from "express";
import {
  getInventory,
  getTransactions,
  getInvoice,
  getInvoices,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/inventory", getInventory);

router.get("/summary", getTransactions);

router.get("/invoice", getInvoice);

router.get("/invoices", getInvoices);

export default router;
