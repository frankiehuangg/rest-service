import { Request, Response } from "express"
import FollowSoapClient from "../../clients/FollowSoapClient";
import axios from "axios";

interface UserCard {
    user_id: number,
    username: string,
    description: string,
    display_name: string,
    profile_picture_path: string
}

export const getFollowingFromUserId = async (req: Request, res: Response) => {
    try {
        const user_id = typeof req.query.user_id === 'string' ? parseInt(req.query.user_id) : 0;

        const client = new FollowSoapClient();

        const response = await client.getFollowFromFollowingUserId(user_id);

        if (Array.isArray(response)) {
            const userData: UserCard[] = [];

            for (const datum of response) {
                const anyDatum : any = datum;
                const user_id = anyDatum.followedUserId;

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

        return res.status(200).json([]);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const getFollowerFromUserId = async (req: Request, res: Response) => {
    try {
        const user_id = typeof req.query.user_id === 'string' ? parseInt(req.query.user_id) : 0;
        
        const client = new FollowSoapClient();

        const response = await client.getFollowFromFollowedUserId(user_id);

        if (Array.isArray(response)) {
            const userData: UserCard[] = [];

            for (const datum of response) {
                const anyDatum : any = datum;
                const user_id = anyDatum.followingUserId;                

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

        return res.status(200).json([]);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const checkUserFollowing = async (req: Request, res: Response) => {
    try {
        const other_user_id = typeof req.query.user_id === 'string' ? parseInt(req.query.user_id) : 0;
        const current_user_id = req.body.user_id;

        const client = new FollowSoapClient();

        const response = await client.checkUserFollowing(current_user_id, other_user_id);

        return res.status(200).json(response);

    } catch (error) {
        return res.status(400).json(error);
    }
}

export const followUserWithUserId = async (req: Request, res: Response) => {
    try {
        const other_user_id = req.body.other_user_id;
        const current_user_id = req.body.user_id;

        const client = new FollowSoapClient();

        const response = await client.createFollow(current_user_id, other_user_id);
        
        return res.status(200).json(response);

    } catch (error) {
        return res.status(400).json(error);
    }
}

export const unfollowUserWithUserId = async (req: Request, res: Response) => {
    try {
        const other_user_id = req.body.other_user_id;
        const current_user_id = req.body.user_id;

        const client = new FollowSoapClient();

        const response = await client.deleteFollow(current_user_id, other_user_id);
        
        return res.status(200).json(response);

    } catch (error) {
        return res.status(400).json(error);
    }
}