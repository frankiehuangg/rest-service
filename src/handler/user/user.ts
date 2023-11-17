import { Request, Response } from "express";
import axios from "axios";
import qs from 'qs';

export const getUserData = async (req: Request, res: Response) => {
    try {
        const user_id = req.query.user_id ? req.query.user_id : req.body.user_id;

        const url = `http://monolithic-web:80/api/user?user_id=${user_id}`;

        const response = await axios.get(
            url,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const data = response.data.data

        return res.status(200).json(data)
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 400) {
                return res.status(400).json({ message: err.message })
            } else if (err.response?.status === 500) {
                return res.status(500).json({ message: err.message })
            }
        }
    }
}

export const updateUserData = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user_id;

        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        const response = await axios.patch(
            'http://monolithic-web:80/api/user/update/' + user_id,
            qs.stringify(req.body),
            {
                headers: headers
            }
        )

        const data = response.data.data

        return res.status(200).json(data)
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 400) {
                return res.status(400).json({ message: err.message })
            } else if (err.response?.status === 500) {
                return res.status(500).json({ message: err.message })
            }
        }
    }
}

export const deleteUserData = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user_id

        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        const response = await axios.delete(
            'http://monolithic-web:80/api/user/delete/' + user_id,
            {
                headers: headers
            }
        )

        const data = response.data.data

        return res.status(200).json({ message: "User deleted successfully"})
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 400) {
                return res.status(400).json({ message: err.message })
            } else if (err.response?.status === 500) {
                return res.status(500).json({ message: err.message })
            }
        }
    }
}