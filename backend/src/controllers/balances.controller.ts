import express, { Request, Response } from "express";
import { UserDto } from "../dto/user";
import * as jwt from "jsonwebtoken";
import { environment } from "../environments/environment";
import balances from "../models/balance.model";
import { BalanceDto } from "../dto/balance";

export const balancesController = express.Router();

balancesController.get("/", async (req: Request, res: Response) => {
    try {
        const balancesArr = await (
            await balances.find({ user: (<any>req).userId })
        ).map((b) => b.toObject());

        return res
            .status(200)
            .send(balancesArr.map((b) => BalanceDto.createFrom(b)));
    } catch (e) {
        return res.status(500).send(e.message);
    }
});
