import "reflect-metadata";
import express from 'express';
import { environment as env } from './environments/environment';
import { connect } from 'mongoose';

import { container } from "tsyringe";
import { AuthService } from "./services/auth.service";
import { authController } from "./controllers/auth.controller";

const app = express();

connect(env.mongodb.connectionUrl, { useNewUrlParser: true }, function (err) {
    if (err) return console.log(err);
    app.listen(env.port, err => {
        if (err) return console.error(err);
        return console.log(`Server is listening on ${env.port}`);
    });
});

container.register<AuthService>(AuthService, { useClass: AuthService });

app.use(express.json());
app.use("/auth", authController);









