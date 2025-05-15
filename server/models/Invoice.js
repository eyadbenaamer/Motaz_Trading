import { model, Schema, Types } from "mongoose";

const { ObjectId } = Types;

export const InvoiceSchema = new Schema({
  amount: { type: Number, default: 0 },
  status: { type: String, default: "pending" },
  details: { type: String, default: "" },
  payment: { type: String, default: "unpaid" },
  attachments: [{ name: String, url: String }],
  transactionId: { type: ObjectId, rel: "Transaction" },
  createdAt: Number,
});

const Invoice = model("invoices", InvoiceSchema);
export default Invoice;
