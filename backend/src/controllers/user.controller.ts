import express, { Request, Response } from "express";
import { UserDto } from "./../dto/user";
import * as jwt from "jsonwebtoken";
import { environment } from "../environments/environment";
import users from "./../models/user.model";

export const userController = express.Router();

userController.get("/", async (req: Request, res: Response) => {
    try {
        const user = await (
            await users.findOne({ _id: (<any>req).userId })
        )?.toObject();

        return res.status(200).send(UserDto.createFrom(user));
    } catch (e) {
        return res.status(401).send(e.message);
    }
});
