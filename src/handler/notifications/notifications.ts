import { Request, Response } from "express";
import NotificationSoapClient from "../../clients/NotificationSoapClient";

export const getNotificationsByUserId = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user_id;
        
        const client = new NotificationSoapClient();

        if (req.query.current) {
            const response = await client.getNotificationFromUserId(parseInt(user_id));
            
            return res.status(200).json(response);
        } else {
            const response = await client.getAllNotifications();

            return res.status(200).json(response);
        }

    } catch (error) {
        return res.status(400).json(error);
    }
}