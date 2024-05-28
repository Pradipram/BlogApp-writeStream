import User from "../model/user.js  ";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Token from "../model/token.js";

dotenv.config();

const handleError = (err)=>{
  let errors = {name:'',username:'',password:''};
  if(err.code === 11000){
    errors.username = "This username already exist.";
    return errors;
  }

  if(err.message.includes('user validation failed')){ 
    Object.values(err.errors).forEach(({properties}) =>{
        errors[properties.path] = properties.message;
    })
  }
  return errors;
}

export const singupUser = async (request, response) => {
  try {
    // console.log(request.body);
    const userData = request.body;
    const newUser = new User(userData);
    await newUser.save();
    // console.log("new user", newUser);
    return response
      .status(200)
      .json({ msg: "Signup successfull"});
  } catch (error) {
    const errors = handleError(error);
    // console.log("error ",errors);
    return response.status(500).json(errors);
  }
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      response.cookie('userId', user.username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // CSRF protection
        maxAge: 15 * 60 * 1000 // 15 minutes
      });

      console.log("cookies has been saved successfully")

      response
        .status(200)
        .json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: user.name,
          username: user.username,
          bannerUrl: user.bannerUrl
        });
    } else {
      response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    console.log("error,user-controller",error)
    response.status(500).json({ msg: "error while login the user" });
  }
};

export const updateUser = async(req,res) =>{
  try{
      const updatedUser = await User.findOneAndUpdate({username:req.body.username},{bannerUrl : req.body.bannerUrl},{new :true});
      res.status(200).json({updatedUser});
  }
  catch(err){
    console.log(err,'user-controller',85);
    return res.status(404).json({msg:err.message});
  }
}