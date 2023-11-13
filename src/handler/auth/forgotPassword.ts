import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const forgotPasswordHandler = async (req: Request, res: Response) => {

    try {

        const body = {
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        }

        const response = await axios.patch(
            "http://monolithic-web:80/api/auth/forget-password",
            body,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }
        )

        const responseJSON = {
            message: "Reset password successful",
            data: response.data.data
        }

        return res.json(responseJSON).redirect('/login')

    } catch (err) { 
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 400) {
                const data = {
                    message: "User was not found, reset password failed"
                }
                return res.status(400).json(data)
            }
        }
    }

}

export default forgotPasswordHandler