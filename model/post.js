import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true,"Please Enter a Title"],
        unique: true
    },
    description: {
        type: String,
        required: [true,"Please Enter description of post"]
    },
    picture: {
        type: String
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