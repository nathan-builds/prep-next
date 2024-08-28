import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        return res.status(500).json({
            msg: 'Server error, missing credentials'
        });
    }

    const { E_USER, PASSWORD_HASH, PRIVATE_KEY } = process.env;

    let match = bcrypt.compareSync(password, PASSWORD_HASH);
    if (!match || username !== E_USER) {
        return res.status(401).json({
            msg: 'Invalid credentials'
        });
    }

    const token = jwt.sign({ userName: E_USER }, PRIVATE_KEY, {
        expiresIn: '1h'
    });

    if (!token) {
        return res.status(500).json({
            msg: 'Faield to sign token'
        });
    }
    res.status(200).json({
        token: token
    });

};