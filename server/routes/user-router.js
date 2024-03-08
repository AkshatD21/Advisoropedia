import express from 'express'
const router = express.Router();
import jwt from 'jsonwebtoken';
import { login, signup, forgotPassword, resetPassword, logout } from '../controllers/user-controller.js';

router
    .post('/signup', signup)
    .post('/login', login)
    .post('/forgot-password', forgotPassword)
    .post('/reset-password/:token', resetPassword)
    .get('/logout', logout)

const verifyUser = async (req, res, next)=> {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({status: false, message:"no token"})
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next()
    } catch(err){
        return res.json(err);
    }
}

router.get('/verify' , verifyUser , (req, res)=> {
    return res.json({status: true, message: "authorized"})
})



export { router as UserRouter }