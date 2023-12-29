import React, { useState, useEffect, useContext } from 'react';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import { DataContext } from '../../context/dataProvider';
import { Container, Image, InputTextField, StyledFormControl, Textarea } from './createStyle';
import { Button } from '@mui/material';
import { UploadImage } from '../../service/ImageApi';
import { createPost } from '../../service/postApi';
// const API_URL = '';

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [image,setImage] = useState('');
    const { account } = useContext(DataContext);
    const [imageUrl,setImageUrl] = useState('https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80');

    useEffect(()=>{
        const getImageUrl = async () =>{
            if(image){
                const data = new FormData();
                data.append('image',image);
                const res = await UploadImage(data);
                if(res.data.imageUrl){
                    setImageUrl(res.data.imageUrl);
                }
            }
        }
        getImageUrl();
    },[image])
      

    const savePost = async () => {
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
        post.picture = imageUrl;
        // console.log(post,'createPost',74);

        const res = await createPost(post);
        console.log(res,'createPost',77);
        if(res.status === 500){
            if(res.data.errors.title){
                // alert('hello world');
                toast.error(res.data.errors.title);
            }
            else{
                toast.error(res.data.errors.description);
            }
        }
        else if(res.status === 200){
            toast.success('Post saved successfully');
            navigate('/');
        }
        else{
            toast.error('Internal server error');  
        }
        // if(res.response.status === 403){
        //     alert('Please Login to continue');
        // }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <div style={{position:'relative'}}>
                <Image src={imageUrl} alt="post" />
                <label htmlFor='fileInput'>
                    <EditIcon sx={{position:'absolute',right:'10px',bottom:'10px',backgroundColor:'black',color:'white',padding:'2px',cursor:'pointer'}}/>
                </label>
            </div>

            <StyledFormControl>
                <Add fontSize="large" color="action" />
                <input
                    name='file'
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            <Textarea
                rowsmin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Container>
    )
}

export default CreatePost;