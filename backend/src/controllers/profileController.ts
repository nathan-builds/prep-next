import express, { Express, Request, Response } from 'express';

const posts = [
    {
        id: 1,
        title: 'Post 1',
        description: 'Description 1'
    },
    {
        id: 2,
        title: 'Post 2',
        description: 'Description 2'
    },
    {
        id: 3,
        title: 'Post 3',
        description: 'Description 3'
    }
];


export const profileController = (req: Request, res: Response) => {
    try {
        res.status(200).json({
            posts: posts
        });
    } catch (e) {
        res.status(500).json({
            msg: 'Server Error while fetching posts'
        });
    }
};