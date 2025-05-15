import { model, Schema, Types } from "mongoose";

const { ObjectId } = Types;

export const CargoSchema = new Schema({
  size: { type: Number, default: 0 },
  containerId: { type: String, default: null },
  url: { type: String, default: "" },
  providerUrl: { type: String, default: "" },
  createdAt: Number,
});

const Cargo = model("cargos", CargoSchema);
export default Cargo;
