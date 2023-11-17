import { Request, Response } from "express";
import axios from "axios";
import prisma from "../../prisma";
import qs from 'qs';

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

export const getRepliesByPostId = async(req: Request, res: Response) => {
    try {
        const post_id = typeof req.query.post_id === 'string' ? parseInt(req.query.post_id) : 0;        

        const replyIds = await prisma.replies.findMany({
            where: {
                post_parent_id: post_id
            }
        })
        
        const promises = replyIds.map(async (reply) => {
            const headers = {
                'Content-Type': 'multipart/form-data',
            }

            const response = await axios.get(
                `http://monolithic-web:80/api/post?post_id=${reply.post_child_id}`,
                {
                    headers: headers
                }
            )

            return response.data.data
        })

        const body = await Promise.all(promises)

        if (body.length > 0) {
            return res.status(200).json(body)
        } else {
            return res.status(404).json({ message: "No replies found" })
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 400) {
                return res.status(404).json({ message: "Data not found" })
            } else if (err.response?.status === 500) {
                return res.status(500).json({ message: "Internal server error" })
            }
        } else {
            return res.status(500).json({ message: "Internal server error, databse error" })
        }
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

interface Post {
    post_id: number,
    user_id: number,
    post_content: string,
    post_timestamp: string,
    likes: number,
    replies: number,
    shares: number
}

interface User {
    user_id: number,
    username: string,
    password: string,
    email: string,
    description: string,
    display_name: string,
    follower_count: number,
    following_count: number,
    join_date: string,
    birthday_date: number,
    birthday_month: number,
    birthday_year: number,
    profile_picture_path: string,
    is_admin: boolean
}

interface Resource {
    post_id: string,
    resource_path: string
}

interface PostData {
    post_id: number,
    profile_picture_path: string,
    display_name: string,
    username: string,
    user_id: number,
    post_timestamp: string,
    post_content: string,
    replies: number,
    shares: number,
    likes: number,
    resources: Resource
}

type RetrievedData = [Post, User, Resource];

export const getForYouPagePosts = async (req: Request, res: Response) => {
    try {
        const url = `http://monolithic-web:80/api/post/read?n=50&json=true`;

        const response = await axios.get(
            url,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const retrievedData = response.data.data;

        const data: PostData[] = [];
        
        retrievedData.map((datum: RetrievedData) => {
            data.push({
                post_id: datum[0].post_id,
                profile_picture_path: datum[1].profile_picture_path,
                display_name: datum[1].display_name,
                username: datum[1].username,
                user_id: datum[0].user_id,
                post_timestamp: datum[0].post_timestamp,
                post_content: datum[0].post_content,
                replies: datum[0].replies,
                shares: datum[0].shares,
                likes: datum[0].likes,
                resources: datum[2]
            });
        });

        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const getUserPostsByUserId = async (req: Request, res: Response) => {
    try {
        const user_id = req.query.user_id;

        const url = `http://monolithic-web:80/api/user/read/${user_id}?json=true`;
    
        const response = await axios.get(
            url,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        const retrievedData = response.data.data;

        const data: PostData[] = [];
        
        retrievedData.map((datum: RetrievedData) => {
            data.push({
                post_id: datum[0].post_id,
                profile_picture_path: datum[1].profile_picture_path,
                display_name: datum[1].display_name,
                username: datum[1].username,
                user_id: datum[0].user_id,
                post_timestamp: datum[0].post_timestamp,
                post_content: datum[0].post_content,
                replies: datum[0].replies,
                shares: datum[0].shares,
                likes: datum[0].likes,
                resources: datum[2]
            });
        });

        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const url = `http://monolithic-web:80/api/post/create`;

        req.body['user_id'] = req.body.user_id;

        const response = await axios.post(
            url,
            qs.stringify(req.body),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        const data = response.data.data;

        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const createRepliesByPostId = async (req: Request, res: Response) => {
    try {
        const post_id = req.query.post_id as string
        
        const result = await prisma.replies.create({
            data: {
                post_parent_id: parseInt(post_id),
                post_child_id: req.body.post_child_id
            }
        })
        
        if (result) {
            return res.status(200).json(result)
        } else {
            return res.status(500).json({ message: "Internal server error" })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}