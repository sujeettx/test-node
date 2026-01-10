import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const Mongo_url = process.env.Mongo_url;

const connectDB = async () => {
    try {
        let conn = await mongoose.connect(Mongo_url);
        console.log("database conncted successfully");
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

}

export default connectDB;