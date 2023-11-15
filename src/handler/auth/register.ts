import { Request, Response } from "express";
import axios from "axios";
import jwt from 'jsonwebtoken';

const registerHandler = async (req: Request, res: Response) => {

    try {
        const body = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        }

        const response = await axios.post(
            'http://monolithic-web:80/api/auth/register',
            body,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        const user_id = response.data.data.user_id
        const isAdmin = response.data.data.is_admin
        const secret = process.env.REST_SECRET_TOKEN ?? ''

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
            message: "Registration successful",
            token: token
        }

        return res.status(200).json(responseJSON);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                return res.json({ message: error.message });
            }
        }
    }

}

export default registerHandler