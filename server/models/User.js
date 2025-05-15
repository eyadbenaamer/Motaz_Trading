import { Schema, model } from "mongoose";
import dotenv from "dotenv";

import { TransactionSchema } from "./Transaction.js";
import { CargoSchema } from "./Cargo.js";
import { InvoiceSchema } from "./Invoice.js";

dotenv.config();

const UserSchema = new Schema({
  name: { type: String, max: 50 },
  username: { type: String, uniqe: true, max: 50 },
  email: { type: String, uniqe: true, max: 50 },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 50,
  },
  transactions: { type: [TransactionSchema], default: [] },
  invoices: { type: [InvoiceSchema], default: [] },
  inventories: {
    guangzhou: { type: [CargoSchema], default: [] },
    benghazi: { type: [CargoSchema], default: [] },
    misurata: { type: [CargoSchema], default: [] },
  },
  balance: { type: Number, default: 0 },
  picture: {
    type: String,
    default: `${process.env.API_URL}/assets/blank_user.jpg`,
  },
  createdAt: Number,
  resetPasswordToken: String,
  verificationStatus: {
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
  },
});

const User = model("Users", UserSchema);
export default User;
