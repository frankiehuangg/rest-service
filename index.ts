require('dotenv').config()

import express from 'express'
import cors from 'cors'
import prisma from './src/prisma'
import handlerWrapperError from './src/utils/handlerWrapperError';
import loginHandler from './src/handler/auth/login';

const app = express();
const PORT = 8000;
const DB_URL = process.env.DATABASE_URL;
const startDate = new Date();

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    console.log(`using database URL ${DB_URL}`);
})

app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
    res.send(`Server has started since ${startDate}`);
})

app.post('/login', handlerWrapperError(loginHandler))