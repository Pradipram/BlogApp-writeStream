import Post from "../model/post.js"

const handleError = (err)=>{
  let errors = {title:'',description:''};
  if(err.code === 11000){
    errors.title = "Please Enter a Unique Title";
    return errors;
  }

  if(err.message.includes('post validation failed')){ 
    Object.values(err.errors).forEach(({properties}) =>{
        errors[properties.path] = properties.message;
    })
  }
  return errors;
}

export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        await post.save();

        response.status(200).json({post,msg:'Post saved successfully'});
    } catch (error) {
        // response.status(500).json(error);
        console.log(error,'post-contorller',26);
        const errors = handleError(error);
        return response.status(500).json({errors});
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    console.log("deletePost function is called ",request.params.id);
    try {
        const post = await Post.findById(request.params.id);
        if(post){
            await post.deleteOne();
        }
        else{
            response.status(404).json({ msg: 'Post not found' })
        }

        response.status(200).json('post deleted successfully');
    } catch (error) {
        console.log("geting error while deleting post from database ",error.message);   
        response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}