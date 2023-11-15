import { Request, Response} from 'express';
import prisma from '../../prisma';

const getPostReports = async (req : Request, res : Response) => {
    try {
        
        const reports = await prisma.postReports.findMany()

        return res.json(reports);

    } catch (err) {
        return res.status(500)
    }
}

export default getPostReports
