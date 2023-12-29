import express from "express";
import { loginUser, singupUser, updateUser } from "../controller/user-controller.js";
import { getImage, uploadImage } from "../controller/image-controller.js";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import { deleteComment, getComments, newComment } from "../controller/comment-controller.js";


//uploading image
import { upload } from "../utils/upload.js";


const router = express.Router();

router.post("/signup",singupUser);
router.post('/login',loginUser);
router.put('/update-user',updateUser);  

// router.post('/file/upload',upload.single('file'),uploadImage);
router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id',authenticateToken,getPost);
router.put('/update/:id',authenticateToken,updatePost);
router.delete('/delete/:id',authenticateToken,deletePost);
router.post('/comment/new',authenticateToken,newComment);
router.get('/comments/:id',authenticateToken,getComments);
router.delete('/comment/delete/:id',authenticateToken,deleteComment);

//Uploading image
router.post('/file/upload-image',upload.single('image'),uploadImage);
router.get('/file/:filename',getImage);

export default router;