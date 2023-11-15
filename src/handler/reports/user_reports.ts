import { Request, Response } from "express";
import axios from "axios";

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
    
        const data = response.data.data
    
        return res.status(200).json(data)
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 404) {
                return res.status(404).json({ message: "Data not found" })
            } else if (err.response?.status === 500) {
                return res.status(500).json({ message: "Internal server error" })
            }
        }
    }

}

export default getUserReports