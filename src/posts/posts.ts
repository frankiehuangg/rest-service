import { Request, Response } from "express";
import axios from "axios";

const getPostById = async (req: Request, res: Response) => {
    try {
        const post_id = req.params.post_id

        const url = `http://monolithic-web:80/api/post?post_id=` + post_id

        const response = await axios.get(url,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        const post = response.data.data;
        return res.status(200).json(post);
    }
}