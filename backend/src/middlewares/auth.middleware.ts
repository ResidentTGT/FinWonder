import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { environment } from "./../environments/environment";

const getTokenFromHeader = (req: any) =>
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
        ? req.headers.authorization.split(" ")[1]
        : null;

export default (req: Request, res: Response, next: any) => {
    const token = getTokenFromHeader(req);

    let isVerified;
    try {
        isVerified = token && jwt.verify(token, environment.jwt.signature);
    } catch (e) {
        return res.status(401).end("Invalid token.");
    }
    if (isVerified) {
        const parsedToken = <any>jwt.verify(token, environment.jwt.signature);
        (<any>req).userId = parsedToken.data._id;
    } else {
        return res.status(401).end("Authorization is failed.");
    }

    next();
};
