import express, { Request, Response } from "express";
import { UserDto } from "./../dto/user";
import { container } from "tsyringe";
import { AuthService } from "../services/auth.service";

export const authController = express.Router();

const authService = container.resolve<AuthService>(AuthService);

authController.post("/register", async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send("Wrong arguments.");
        }

        const userDto = await authService.SignUp(
            req.body.email,
            req.body.password,
            req.body.name
        );

        return res.status(200).send(userDto);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

authController.post("/login", async (req: Request, res: Response) => {
    try {
        const user = await authService.Login(req.body.email, req.body.password);

        return res.status(200).send(user);
    } catch (e) {
        return res.status(401).send(e.message);
    }
});
