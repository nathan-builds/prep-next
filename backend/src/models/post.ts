import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    userID: Number,
    text: String
});

const Post = mongoose.model('Post', postSchema);

export default Post;