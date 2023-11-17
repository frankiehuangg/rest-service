import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.REST_SECRET_TOKEN as string, (err: any, decoded: any) => {
            if (err || !decoded || !decoded.isAdmin) {
                return res.status(403)
            }
            next()
        })
    } else {
        res.status(401)
    }
}

export const verifyTokenGeneral = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.REST_SECRET_TOKEN as string, (err: any) => {
            if (err) {
                return res.status(400).json({ message: "Session timed out, please log back in" })
            }

            next()
        })
    } else {
        res.status(400)
    }
}