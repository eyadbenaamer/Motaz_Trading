import { model, Schema, Types } from "mongoose";

const { ObjectId } = Types;

export const TransactionSchema = new Schema({
  amount: { type: Number, default: 0 },
  details: { type: String, default: "" },
  type: { type: String, default: "withdraw" },
  balance: { type: Number, default: 0 },
  invoiceId: ObjectId,
  createdAt: Number,
});

export const Transaction = model("transactions", TransactionSchema);
export default Transaction;
