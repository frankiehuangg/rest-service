import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

export const decodeToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.REST_SECRET_TOKEN as string, (err: any, decoded: any) => {
            if (err || !decoded || !decoded.isAdmin) {
                return res.status(403)
            }

            req.body.user_id = decoded.user_id
            next()
        })
    } else {
        res.status(401)
    }
}