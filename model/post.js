import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false   
    },
    createdDate: {
        type: Date,
        default : Date.now()
    }
});


const post = mongoose.model('post', PostSchema);

export default post;