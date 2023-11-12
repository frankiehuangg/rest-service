import { Request, Response } from "express";
import axios from "axios";
import jwt from 'jsonwebtoken';

const registerHandler = async (req: Request, res: Response) => {

    const [username, email, password, confirm_password] = req.body

    try {
        const body = {
            username: username,
            email: email,
            password: password,
            confirm_password: confirm_password
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

        const token = jwt.sign(response.data.username, 'rest-service', { algorithm: 'RS256' })

        const responseJSON = {
            message: "Registration successful",
            token: token
        }

        return res.status(200).json(responseJSON).redirect('/')

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status !== 400) {
                return res.json({ message: error.message });
            }
        }
    }

}

export default registerHandler