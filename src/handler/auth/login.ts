import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import axios from 'axios';

const loginHandler = async (req: Request, res: Response) => {

    try {
        const [username, password] = req.body;

        const body = {
            username: username,
            password: password
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

        const token = jwt.sign(response.data.username, 'rest-service', { algorithm:'RS256' })
        
        const responseJSON = {
            message: "Login successful",
            token: token
        }
        
        return res.status(200).json(responseJSON).redirect('/');

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