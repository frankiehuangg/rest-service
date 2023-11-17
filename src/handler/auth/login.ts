import { Request, Response } from "express";
import jwt  from "jsonwebtoken";
import axios from 'axios';

const loginHandler = async (req: Request, res: Response) => {

    try {
        const body = {
            username: req.body.username,
            password: req.body.password
        };

        const response = await axios.post(
            'http://monolithic-web:80/api/auth/login', 
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        const user_id = response.data.data.user_id;
        const isAdmin = response.data.data.is_admin;
        const secret = process.env.REST_SECRET_TOKEN ?? '';

        const token = jwt.sign(
            { 
                user_id: user_id, 
                isAdmin: isAdmin
            }, 
            secret, 
            {
                expiresIn:'30m' 
            }
        )
        
        const responseJSON = {
            message: "Login successful",
            token: token
        }
        
        return res.status(200).json(responseJSON);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                const data = {
                    message: "User not found"
                }
                return res.status(400).json(data);
            }
        }
    }
}

export default loginHandler