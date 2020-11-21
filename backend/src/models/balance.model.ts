import { Schema, model } from "mongoose";

const balanceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    user: { ref: "users", type: Schema.Types.ObjectId, required: true },
    creationDate: { type: Date, default: Date.now },
});

export default model("balances", balanceSchema);
