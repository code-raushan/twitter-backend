import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'
import routes from "./router/routes";
dotenv.config()


const app:Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routes)

export default app;