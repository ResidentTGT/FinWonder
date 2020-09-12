import { Schema, model } from "mongoose";

const userScheme = new Schema(
    {
        name: String,
        age: Number
    },
    { versionKey: false });
export const User = model("User", userScheme);
