import express, { Request, Response } from "express";
import { AuthService } from './../services/auth.service';
import { container } from 'tsyringe';

export const authRouter = express.Router();

const authService = container.resolve<AuthService>(AuthService);

authRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const user = await authService.SignUp(req.body.email, req.body.password, req.body.name)

        res.status(200).send(user);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

authRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const user = await authService.Login(req.body.email, req.body.password)

        res.status(200).send(user);
    } catch (e) {
        res.status(404).send(e.message);
    }
});
