import { Request, Response} from 'express';
import prisma from '../../prisma';

export const getPostReports = async (req : Request, res : Response) => {
    try {
        const page = parseInt(req.params.page)
        const offset = page * 10

        const reports = await prisma.postReports.findMany({
            skip: offset,
            take: 10
        })

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
    
    try {
        const post_id = req.body.post_id
        const user_id = req.body.user_id

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
            return res.status(200).json({ message: 'Status change successful' })
        } else {
            return res.status(404).json({ message: 'Report not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}