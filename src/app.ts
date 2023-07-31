import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'
import routes from "./router/routes";
import passport = require("passport");
import { passportAuth } from "./config/jwt.middleware";
dotenv.config()


const app:Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());
passportAuth(passport)

app.use('/api', routes)

export default app;