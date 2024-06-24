import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "../db/connect.js";
import userRouter from "../routes/user.route.js";

const app = express();

const port = 3000;

app.use('/api/user', userRouter);

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Listening at port ${port}!...`));
    } catch (error) {
        console.log(error)
    }
}

start();