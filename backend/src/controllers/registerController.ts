import { Request, Response } from 'express';

export const register = (req: any, res: Response) => {
    console.log(req.body);
    res.status(200).json({ message: 'User registered' });
};

export const file = (req: any, res: Response) => {
    console.log(req.files.resume);
    res.status(200).json({ message: 'We got to the file endpoint' });

};
