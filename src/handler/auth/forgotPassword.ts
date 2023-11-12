import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const forgotPasswordHandler = async (req: Request, res: Response) => {

    const [email, password, confirm_password] = req.body

    try {

        const body = {
            email: email,
            password: password,
            confirm_password: confirm_password
        }

        const response = axios.post(
            "http://monolithic-web:80/api/auth/forget-password",
            body,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }
        )

        const responseJSON = {
            message: "Reset password successful"
        }

        return res.json(responseJSON).redirect('/login')

    } catch (err) { 
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 400) {
                const data = {
                    message: "Reset password failed"
                }
                return res.status(500).json(data)
            }
        }
    }

}

export default forgotPasswordHandler