import { Schema, model } from "mongoose";

const userScheme = new Schema(
    {
        email: String,
        password: String,
        name: String,
        age: Number
    },
    { versionKey: false });
export const User = model("User", userScheme);
