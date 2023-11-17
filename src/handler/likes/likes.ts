import { Request, Response } from "express"
import prisma from "../../prisma"
import axios from "axios";
import qs from 'qs';
import NotificationSoapClient from "../../clients/NotificationSoapClient";

export const insertLikesByPostId = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user_id;
        const post_id = req.body.post_id;

        const likes = await prisma.likes.create({
            data: {
                user_id : user_id,
                post_id : post_id
            }
        });

        if (likes) {

            const postUrl = `http://monolithic-web:80/api/post?post_id=${post_id}`;

            const postResponse = await axios.get(
                postUrl,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const likes = postResponse.data.data.likes;

            const likesUrl = `http://monolithic-web:80/api/post/update/${post_id}`;

            const data = {
                likes: likes + 1,
                user_id: req.body.user_id
            };

            const likesResponse = await axios.patch(
                likesUrl,
                qs.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            const notificationClient = new NotificationSoapClient();

            const poster_user_id = postResponse.data.data.user_id;
    
            const notificationResponse = await notificationClient.createNotification(
                poster_user_id, 
                `User with ID ${user_id} has liked your post with ID ${post_id}.`
            );

            return res.status(200).json({ message: 'Likes updated successfully'});
        } 
            
        return res.status(500).json({ message: 'Internal server error' });
    } catch (error) {
        return res.status(400).json(error);
    }
}


export const deleteLikesByPostId = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user_id;
        const post_id = req.body.post_id;

        const dislike = await prisma.likes.delete({
            where: {
                user_id_post_id: {
                    user_id : user_id,
                    post_id : post_id
                }
            }
        });

        if (dislike) {

            const postUrl = `http://monolithic-web:80/api/post?post_id=${post_id}`;

            const postResponse = await axios.get(
                postUrl,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const likes = postResponse.data.data.likes;

            const likesUrl = `http://monolithic-web:80/api/post/update/${post_id}`;

            const data = {
                likes: likes - 1,
                user_id: req.body.user_id
            };

            const likesResponse = await axios.patch(
                likesUrl,
                qs.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            return res.status(200).json({ message: 'Dislikes updated successfully'});
        } 
            
        return res.status(500).json({ message: 'Internal server error' });
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const checkLikedByPostId = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user_id 
        const post_id = typeof req.query.post_id === 'string' ? parseInt(req.query.post_id) : 0; 

        const like = await prisma.likes.findFirst({
            where: {
                    user_id : user_id,
                    post_id : post_id
            }
        });        

        if (like) {
            return res.status(200).json({ status: true });
        }
        
        return res.status(500).json({ status: false });
    } catch (error) {
        return res.status(400).json(error);
    }
}