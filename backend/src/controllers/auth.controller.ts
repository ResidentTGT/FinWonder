import express, { Request, Response } from "express";
import { UserDto } from "./../dto/user";
import { container } from "tsyringe";
import { AuthService } from '../services/auth.service';

export const authController = express.Router();

const authService = container.resolve<AuthService>(AuthService);

authController.post("/register", async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).send('Wrong arguments.');
        }

        const userDto = UserDto.createFrom(await authService.SignUp(req.body.email, req.body.password, req.body.name));

        res.status(200).send(userDto);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

authController.post("/login", async (req: Request, res: Response) => {
    try {
        const user = await authService.Login(req.body.email, req.body.password)

        res.status(200).send(user);
    } catch (e) {
        res.status(404).send(e.message);
    }
});
