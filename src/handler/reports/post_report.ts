import { Request, Response} from 'express';
import prisma from '../../prisma';

export const getPostReports = async (req : Request, res : Response) => {
    try {
        
        const reports = await prisma.postReports.findMany()

        if (reports) {
            return res.status(200).json(reports);
        } else {
            return res.status(404)
        }

    } catch (err) {
        return res.status(500)
    }
}

export const setPostReportStatus = async (req : Request, res : Response) => {
    const post_id = req.params.post_id
    const user_id = req.params.user_id

    try {
        const report = await prisma.postReports.update({ 
            where: {
                post_id_user_id: {
                    post_id: parseInt(post_id),
                    user_id: parseInt(user_id)
                }
            },
            data: {
                status: req.body.status
            }
        })

        if (report) {
            return res.status(200).json(report)
        } else {
            return res.status(404).json({ message: 'Report not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}