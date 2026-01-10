import express from "express";
const router = express.Router();
import  {
    register,
    login,
    RefreshToken
} from '../controllers/auth.controllers.js'

router.post('/register',register);
router.post('/login',login);
router.post('/refresh-token',RefreshToken);

export default router;