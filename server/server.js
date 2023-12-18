import express from "express"
const app = express()

import morgan from "morgan"
if(process.env.NODE_ENV!=='PRODUCTION'){
    app.use(morgan('dev'));
}

import dotenv from "dotenv"
dotenv.config()

import "express-async-errors"


import db from "./db/connect.js";

//routers
import authRouter from "./Routes/authRoutes.js";
import collectionRouter from "./Routes/collectionRoutes.js";
import redirectRouter from "./Routes/redirectRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";


import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, collectionRouter)
app.use("/api/v1/redirect", redirectRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try{
        await db.raw(`SELECT 1`);
        app.listen(port,()=>{
            console.log(`Listening to port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();