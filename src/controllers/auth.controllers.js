import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import {
    generateAcessToken,
    generateRefreshToken,
    verfyRefreshToken
} from '../middlewares/tokenManagement.js';

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "please enter email and password"
            })
        }
        if (!email.includes("@")) {
            return res.status(400).json({
                message: "enter valid email"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({
            messsage: " user alreay exist with this email"
        })
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({
            message: "user register successsfully"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: " server problem"
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "please enter email and password"
            })
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({
            message: " enter valid email"
        })

        const ischeckedPassword = await bcrypt.compare(password, user.password);
        if (!ischeckedPassword) return res.status(400).json({
            message: " enter correct password"
        })

        const accessToken = generateAcessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json({
            message: " user login successfully",
            AcessToken: accessToken,
            RefreshToken: refreshToken
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: " server problem"
        })
    }
}

const RefreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            return res.status(400).json({
                Message: "enter refreshtoken",
            });

        const user = await User.findOne({ refreshToken });
        if (!refreshToken)
            return res.status(401).status({
                message: " enter valid refreshToken",
            });
        const decoded = verfyRefreshToken(user.refreshToken);

        const newAceesToken = generateAcessToken(decoded);
        return res.status(200).json({
            new_Access_token: newAceesToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "reshreshToken are expired or server problem ",
        });
    }
};
export {
    register,
    login,
    RefreshToken
}