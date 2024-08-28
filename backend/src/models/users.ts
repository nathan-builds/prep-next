const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    email: String
});

const UserModel = new mongoose.model('fake', userSchema);

export default UserModel;