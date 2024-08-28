import express, { Express, Request, Response } from 'express';
import Post from '../models/post';

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


const createNewPost = async (text: string) => {
    const dbPost = new Post({
        userID: 1,
        text: text
    });
    try {
        const res = await dbPost.save();
        return res;
    } catch (e) {
        console.log(e);
    }
    return null;
};

export const newPostController = async (req: Request, res: Response) => {

    console.log('At the post controller');
    const { post } = req.body;
    if (!post) {
        //app error
    }

    const createdPost = await createNewPost(post);
    if (!createdPost) {
        return res.status(500).json({
            msg: 'Failed to create post'
        });
    }

    console.log('Created post with data of', createdPost);


    res.status(200).json({
        msg: 'Got it dawg.',
        post: createdPost
    });

    try {


    } catch (e) {
        res.status(500).json({
            msg: 'Server Error while fetching posts'
        });
    }
};