import BlockSoapClient from "../../clients/BlockSoapClient";
import { Request, Response } from "express";
import axios from "axios";

interface UserCard {
    user_id: number,
    username: string,
    description: string,
    display_name: string,
    profile_picture_path: string
}

export const getBlockedUsersByUserId = async (req: Request, res: Response) => {
    try {
        const user_id: string = typeof req.query.user_id == 'string' ? req.query.user_id : "";
        
        const client = new BlockSoapClient()

        const response = await client.getBlockFromBlockedUserId(parseInt(user_id)) 

        if (Array.isArray(response)) {
            const userData: UserCard[] = [];
            
            for (const datum of response) {
                const anyDatum : any = datum;
                const user_id = anyDatum.blockingUserId;
                

                const url = `http://monolithic-web:80/api/user?user_id=${user_id._text}`;

                const response = await axios.get(
                    url,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                const data = response.data.data

                userData.push({
                    user_id: data.user_id,
                    username: data.username,
                    description: data.description,
                    display_name: data.display_name,
                    profile_picture_path: data.profile_picture_path
                })
            };
            return res.status(200).json(userData);
        }
        return res.status(200).json([])
    } catch (err) {
        return res.status(400).json(err)
    }
}

export const checkBlocked = async (req: Request, res: Response) => {
    try {
        const blockedUserId: string = typeof req.query.user_id == 'string' ? req.query.user_id : "";
        const blockingUserId = req.body.user_id
        
        const client = new BlockSoapClient()

        const response = await client.checkUserBlocking(blockingUserId, parseInt(blockedUserId))

        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json(err)
    }
}

export const blockUser = async (req: Request, res: Response) => {
    try {
        const blockedUserId = req.body.other_user_id
        const blockingUserId = req.body.user_id

        const client = new BlockSoapClient()

        const response = await client.createBlock(blockingUserId, blockedUserId)

        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json(err)
    }
}

export const unBlockUser = async (req: Request, res: Response) => {
    try {     
        const blockedUserId = req.body.other_user_id
        const blockingUserId = req.body.user_id

        const client = new BlockSoapClient()

        const response = await client.deleteBlock(blockingUserId, blockedUserId)

        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json(err)
    }
}