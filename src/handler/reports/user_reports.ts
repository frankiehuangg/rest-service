import { Request, Response } from "express";
import axios from "axios";

export const getUserReports = async (req: Request, res: Response) => {
    
    try {
        const page = req.params.page

        const response = await axios.get(
            'http://monolithic-web:80/report_list/' + page,
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
                return res.status(404)
            } else if (err.response?.status === 500) {
                return res.status(500)
            }
        }
    }

}

export const setUserReportStatus = async (req: Request, res: Response) => {
    
    try {
        const report_id = req.params.id

        const body = {
            report_id: report_id,
            status: req.body.status
        }

        const report = await axios.patch(
            'http://monolithic-web:80/api/user_report/update',
            JSON.stringify(body),
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )

        if (report) {
            return res.status(200).json(report)
        } else {
            return res.status(404).json({ message: 'Report not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}