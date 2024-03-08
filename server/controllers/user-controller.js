import { User } from "../models/User.js";
import bcryt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.json({ status: false, message: "User already exists" });
    }

    const hashedPassword = await bcryt.hash(password, 10)
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    })

    await newUser.save()
    return res.json({ status: true, message: "record registered" })
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ status: false, message: "User not registered" })
    }

    const validPassword = await bcryt.compare(password, user.password)
    if (!validPassword) {
        return res.json({ status: false, message: "Invalid Password" })
    }

    const token = jwt.sign({ userame: user.username }, process.env.KEY, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.json({ status: true, message: "login successful" })
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ status: false, message: "user not registered" })
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' })
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akshatd212003@gmail.com',
                pass: process.env.PASSWORD
            }
        });

        var mailOptions = {
            from: 'akshatd212003@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "Error sending Email" })
            } else {
                return res.json({ status: true, message: "email sent" })
            }
        });
    } catch (err) {
        console.log(err)
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcryt.hash(password, 10);
        await User.findOneAndUpdate({ _id: id }, { password: hashPassword });
        return res.json({ status: true, message: "updated password" })
    } catch (err) {
        return res.json({ message: "invalid token" })
    }
}

export const logout = (req, res) => {
    res.clearCookie('token')
    return res.json({ status: true })
}