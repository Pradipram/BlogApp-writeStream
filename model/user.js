import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please Enter Your name"]
    },
    username: {
        type: String,
        required: [true,"Please enter username"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Please enter password"]
    },
    bannerUrl:{
        type : String,
        default : 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg'
    }
});

userSchema.pre("save",async function (next) {
    //   console.log("user is going to be created and saved ", this);
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password,salt);
      next();
});

const user = mongoose.model('user', userSchema);

export default user;