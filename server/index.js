import express from "express"
import dotenv from "dotenv"
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser"
dotenv.config()
import { UserRouter } from './routes/user-router.js'
import { ProductRouter } from "./routes/product-router.js"

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)
app.use('/api/products', ProductRouter);

mongoose.connect('mongodb://127.0.0.1:27017/authentication')

app.listen(process.env.PORT, () => {
    console.log("server is running")
})