import dotenv from "dotenv";
dotenv.config()
import express from 'express';
import conncectDB from './src/config/db.js'
import authRoutes from './src/routes/auth.routes.js'
const app = express();
const port = process.env.PORT
app.get('/',(req,res)=>{
    res.send("<h1> welcome to server</h1>")
})
app.use(express.json())
app.use('/auth',authRoutes)
conncectDB();

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})