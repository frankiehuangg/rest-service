import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.REST_SERVICE_TOKEN as string, (err: any, user: any) => {
            if (err) {
                return res.status(403)
            }
            
            if (user.isAdmin) {
                next()
            } else {
                return res.status(403)
            }
        })
    } else {
        res.status(401)
    }
}

export default verifyToken