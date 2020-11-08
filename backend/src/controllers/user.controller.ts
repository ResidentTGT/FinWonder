import express, { Request, Response } from "express";
import { UserDto } from "./../dto/user";
import * as jwt from "jsonwebtoken";
import { environment } from "../environments/environment";
import { User } from "./../models/user.model";

export const userController = express.Router();

userController.get("/", async (req: Request, res: Response) => {
    try {
        const token = <any>(
            jwt.verify(
                req.headers.authorization.split(" ")[1],
                environment.jwt.signature
            )
        );
        const user = await (
            await User.findOne({ email: token.data.email })
        ).toObject();

        return res.status(200).send(UserDto.createFrom(user));
    } catch (e) {
        return res.status(401).send(e.message);
    }
});
