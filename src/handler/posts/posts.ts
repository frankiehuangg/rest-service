import { Request, Response } from "express";
import axios, { isAxiosError } from "axios";
import prisma from "../../prisma";

export const getPostByPostId = async (req: Request, res: Response) => {
    try {
        const post_id = req.query.post_id

        const url = `http://monolithic-web:80/api/post?post_id=${post_id}`;

        const response = await axios.get(
            url,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const post = response.data.data;

        return res.status(200).json(post);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const getUserByPostId = async (req: Request, res: Response) => {
    try {
        const post_id = req.query.post_id;

        const post_url = `http://monolithic-web:80/api/post?post_id=${post_id}`;

        const post_response = await axios.get(
            post_url,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const user_id = post_response.data.data.user_id;

        const user_url = `http://monolithic-web:80/api/user?user_id=${user_id}`;

        const user_response = await axios.get(
            user_url,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const user = {
            profile_picture_path : user_response.data.data.profile_picture_path,
            display_name : user_response.data.data.display_name,
            username : user_response.data.data.username,
            user_id : user_response.data.data.user_id
        };

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const getResourceByPostId = async (req: Request, res: Response) => {
    try {
        const post_id = req.query.post_id;

        const url = `http://monolithic-web:80/api/resource?post_id=${post_id}`;

        const response = await axios.get(
            url,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const resource = response.data.data;

        return res.status(200).json(resource);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const getRepliesByPostId = async (req: Request, res: Response) => {
    try {
        const post_id = req.params.post_id

        const replyIds = await prisma.replies.findMany({
            where: {
                post_parent_id: parseInt(post_id)
            }
        })

        let body: any[] = []

        replyIds.forEach( async (reply) => {
            const headers = {
                'Content-Type': 'multipart/form-data'
            }

            const response = await axios.get(
                `http://monolithic-web:80/api/post?post_id=${reply.post_child_id}`,
                {
                    headers: headers
                }
            )

            const data = response.data.data

            body.push(data)
        })

        if (body.length > 0) {
            return res.status(200).json(body)
        } else {
            return res.status(404).json({ message: "No replies found" })
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 404) {
                return res.status(404).json({ message: "Data not found" })
            } else if (err.response?.status === 500) {
                return res.status(500).json({ message: "Internal Server Error" })
            }
        } else {
            return res.status(500).json({ message: "Internal server error, database error" })
        }
    }
}