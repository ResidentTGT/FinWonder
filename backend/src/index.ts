import "reflect-metadata";
import express from 'express';
import { environment as env } from './environments/environment';
import * as handlers from './handlers';
import { connect, model, Schema } from 'mongoose';
import { User } from "./models/user.model";

import { Request, Response } from 'express';

const app = express();

const url = `mongodb://localhost:${env.mongodb.port}/${env.mongodb.name}`;
connect(url, { useNewUrlParser: true }, function (err) {
    if (err) return console.log(err);
    app.listen(env.port, err => {
        if (err) return console.error(err);
        return console.log(`Server is listening on ${env.port}`);
    });
});

app.get('/', handlers.rootHandler);

const usersHandler = (_req: Request, res: Response) => {
    User.find({}, function (err, users) {
        if (err) return console.log(err);
        return res.send(users);
    });
};

app.get("/api/users", usersHandler);




