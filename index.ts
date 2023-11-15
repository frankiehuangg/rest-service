require('dotenv').config()

import express from 'express'
import cors from 'cors'
import handlerWrapperError from './src/utils/handlerWrapperError';
import loginHandler from './src/handler/auth/login';
import registerHandler from './src/handler/auth/register';
import forgotPasswordHandler from './src/handler/auth/forgotPassword';
import verifyToken from './src/middleware/verifyToken';
import { getPostReports, setPostReportStatus } from './src/handler/reports/post_report';
import { getUserReports, setUserReportStatus } from './src/handler/reports/user_reports';

const app = express();
const PORT = process.env.REST_PORT;
const DB_URL = process.env.REST_DATABASE_URL;
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

app.post('/register', handlerWrapperError(registerHandler))

app.patch('/forgot-password', handlerWrapperError(forgotPasswordHandler))

app.get('/post-reports', verifyToken, getPostReports)

app.post('/post-reports/:id/status', verifyToken, setPostReportStatus)

app.get('/user-reports', verifyToken, getUserReports)

app.patch('/user-reports/:id/status', verifyToken, setUserReportStatus)
