import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
const access_token = process.env.ACEES_TOKEN;
const refresh_token  = process.env.REFRESH_TOKEN;

const generateAcessToken = (userId)=>{
    return jwt.sign(
        {userId},
        access_token,
        {expiresIn:"1m"}
    )
}

const generateRefreshToken = (userId)=>{
    return jwt.sign(
        {userId},
        refresh_token,
        {expiresIn:"7d"}
    )
}

const verfyRefreshToken = (token)=>{
    jwt.verify(
        token,
        refresh_token
    )
}

export {
    generateAcessToken,
    generateRefreshToken,
    verfyRefreshToken
}