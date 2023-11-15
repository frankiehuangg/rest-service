require('dotenv').config()

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import prisma from './src/prisma'
import handlerWrapperError from './src/utils/handlerWrapperError';
import loginHandler from './src/handler/auth/login';
import registerHandler from './src/handler/auth/register';
import forgotPasswordHandler from './src/handler/auth/forgotPassword';
import { verifyAdminToken, verifyTokenGeneral } from './src/middleware/verifyToken';
import { getPostReports, setPostReportStatus } from './src/handler/reports/post_report';
import { getUserReports, setUserReportStatus } from './src/handler/reports/user_reports';
import { getUserData, updateUserData, deleteUserData } from './src/handler/user/user';
import { getPostByPostId, getResourceByPostId, getUserByPostId } from './src/posts/posts';

const app = express();
const PORT = process.env.REST_PORT;
const DB_URL = process.env.REST_DATABASE_URL;
const startDate = new Date();

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    console.log(`using database URL ${DB_URL}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_, res) => {
    res.send(`Server has started since ${startDate}`);
})

app.post('/login', handlerWrapperError(loginHandler))

app.post('/register', handlerWrapperError(registerHandler))

app.patch('/forgot-password', handlerWrapperError(forgotPasswordHandler))

app.get('/post-reports', verifyAdminToken, getPostReports)

app.patch('/post-reports/status', verifyAdminToken, setPostReportStatus)

app.get('/post', getPostByPostId);

app.get('/post/user', getUserByPostId);

app.get('/post/resource', getResourceByPostId);

app.get('/user-reports/:page', verifyAdminToken, getUserReports)

app.patch('/user-reports/status', verifyAdminToken, setUserReportStatus)

app.get('/user/:id', verifyTokenGeneral, getUserData)

app.patch('/user', verifyTokenGeneral, updateUserData)

app.delete('/user', verifyTokenGeneral, deleteUserData)
