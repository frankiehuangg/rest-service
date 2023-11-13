import { Request, Response } from "express";
import axios from 'axios';

const getUserReports = async (req: Request, res: Response) => {

    try {
        const response = await axios.get(
            'http://monolithic-web:80/api/user_report/read',
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )

        return res.status(200).json(response.data);

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 400) {
                return res.status(400).json({ message: "No reports found" })
            } else if (err.response?.status === 500) {
                return res.status(500).json({ message: "Internal server error" })
            }
        }
    }

}

export default getUserReports;