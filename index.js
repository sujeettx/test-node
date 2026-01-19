import dotenv from "dotenv";
dotenv.config()
import Upload from './src/middlewares/upload.js';
import express, { urlencoded } from 'express';
import conncectDB from './src/config/db.js'
import authRoutes from './src/routes/auth.routes.js'
const app = express();
const port = process.env.PORT
app.use(express.json())
app.use(urlencoded({
    extended :"false"
}))
app.post('/uploads',Upload.fields(
    [{ name:"profilePitcure",maxCount:1 },
      {resume:"resume",maxCount:1},
      {cerficate:"certificate",maxCount:1}]),
    (req,res)=>{
    res.json({
        message:"file uploaded successfully"
    })
})











app.use('/auth',authRoutes)
conncectDB();

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})