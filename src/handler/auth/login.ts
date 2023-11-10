import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginHandler = async (req: Request, res: Response) => {

    try {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        const requestBody = new URLSearchParams(req.body).toString();
        
        const phpResponse = await fetch('http://localhost:8008/api/auth/login', {
            method: 'POST',
            headers: headers,
            body: requestBody,
        });

        if (!phpResponse.ok) {
            throw new Error(`HTTP error! Status: ${phpResponse.status}`);
        }

        const responseData = await phpResponse.json();

        // Process responseData as needed

        return res.status(200).json(responseData);

    } catch (error) {
        console.error('Fetch error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

export default loginHandler;
