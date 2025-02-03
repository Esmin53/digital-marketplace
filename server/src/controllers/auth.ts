import { Request, Response } from 'express';
import { userValidator } from "@shared/validators/auth";
import User from 'server/src/models/User';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
    try {
        
        const {username, password, role} = userValidator.parse(req.body)

        const userExist = await User.findOne({
            username: username
        })

        if(userExist) {
            res.status(409).json({success: false, message: "That username is already taken"})
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ 
            username, 
            password: hashedPassword,
            role
        });

        const newUser = await user.save();

        res.status(200).json({success: true, message: "Account created"})
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ error: 'Internal Server Error', success: false });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body

        if (!username || !password) { 
            res.status(400).json({ success: false, message: "Please provide all required information" })
            return
        }

        const user = await User.findOne({
            username: username
        })


        if(!user) {
            res.status(404).json({success: false, message: "Incorect username or passwrod! Please try again."})
            return
        }

        const isMatch = await bcrypt.compare(password, user?.password!)

        if(!isMatch) {
            res.status(400).json({success: false, message: "Incorect username or passwrod! Please try again."})
            return
        }

        const payload = { user: { id: user.id, username: user.username }}

        jwt.sign(
            payload,
            process.env.JWT_SECRET!,
            {expiresIn: "30d"},
            (err, token) => {
                if (err) throw err;
                    res.status(200).json({ 
                    token: token,
                    id: user.id,
                    username: user.username,
                    role: user.role
                });
              }

        )
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
