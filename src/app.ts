import express, { Application } from 'express';
import { routes } from './routes';
import cors from 'cors';

export const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

routes(app);
