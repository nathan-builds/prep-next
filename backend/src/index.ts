// src/index.js
import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import profileRouter from './routers/profileRouter';
import registerRouter from './routers/registerRouter';
import loginRouter from './routers/authRouter';
import { AppError } from './middleware/errorHandler';
import UserModel from './models/users';


const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');


const morgan = require('morgan');

const cors = require('cors');
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(fileUpload());

const connectToDB = async () => {
    mongoose.connect('mongodb+srv://barstool-user:3pJ3SueuhZ5BgieK@barstool-cluster.c2ibypv.mongodb.net/home').then(()=>console.log('We connected to the database'));
};

connectToDB();
const port = process.env.PORT || 3002;
app.use(morgan('dev'));
app.use(cors());

app.use('/profile', profileRouter);
app.use('/register', registerRouter);
app.use('/auth', loginRouter);


app.get('/', async (req: Request, res: Response) => {
    console.log('Attempting save here');
    const testUser = new UserModel({
        username: 'Nate Dawg',
        email: 'nat@gmail.com'
    });
    const dbRes = await testUser.save().then(console.log);
    res.status(200).json({
        msg:'Done'
    })

});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code).json({
        msg: err.message
    });
});

