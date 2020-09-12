import "reflect-metadata";
import express from 'express';
import { environment as env } from './environments/environment';
import * as handlers from './handlers';
const app = express();
app.get('/', handlers.rootHandler);

app.listen(env.port, err => {
    if (err) return console.error(err);
    return console.log(`Server is listening on ${env.port}`);
});
