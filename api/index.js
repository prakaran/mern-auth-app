import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.use((error, req, res, next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})


const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Listening at port ${port}!...`));
    } catch (error) {
        console.log(error)
    }
}

start();