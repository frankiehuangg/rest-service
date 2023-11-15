import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.REST_SERVICE_TOKEN as string, (err: any, decoded: any) => {
            if (err || !decoded || !decoded.isAdmin) {
                return res.status(403)
            }
        })
        
        next()
    } else {
        res.status(401)
    }
}

export default verifyAdminToken