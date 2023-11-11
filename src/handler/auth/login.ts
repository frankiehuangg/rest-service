import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const loginHandler = async (req: Request, res: Response) => {

    try {
        const requestBody = new URLSearchParams(req.body).toString();

        const body = {
            username: 'amongus',
            password: 'amongus'
        };

        const response = await axios.post(
            'http://monolithic-web:80/api/auth/login', 
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        console.log(response);

        const responseJSON = response.data;
        
        return res.status(200).json(responseJSON);
        
        // const phpResponse = await axios.post('http://host.docker.internal:8008/api/auth/login', {
        //     headers: headers,
        //     body: requestBody,
        // }).then(response => {
        //     console.log(response);
        //     return res.status(200).json(response);
        // }).catch(error => {
        //     console.log(error);
        // });

        // if (!phpResponse.ok) {
        //     throw new Error(`HTTP error! Status: ${phpResponse.status}`);
        // }

        // const responseData = await phpResponse.json();

        // Process responseData as needed

        // return res.status(200).json(responseData);

    } catch (error) {
        console.error('Fetch error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

export default loginHandler;
