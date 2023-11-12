import { Request, Response} from 'express';
import prisma from '../../prisma';

export const getPostReports = async (req : Request, res : Response) => {
    try {
        
        const reports = await prisma.postReports.findMany()

        return res.json(reports);
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            message: "Server error"
        })
    }
}