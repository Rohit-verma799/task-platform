import express from "express";
const app = new express();
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import authRoute from './routes/auth.route.js'
import taskRoute from './routes/task.route.js'
import cookieParser from "cookie-parser";
dotenv.config();
dbConnect();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.get('/health',(req,res) =>{
  res.json({msg: "Works"})
})

app.use('/api/user', authRoute)
app.use('/api/task',taskRoute)

app.listen(3000, (req, res) => {
  console.log("Server Started at 3000")
})