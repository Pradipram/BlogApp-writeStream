import React, { useState, useEffect, useContext } from 'react';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/dataProvider';
import axios from 'axios';
import { API_URL } from '../../constants/config';
import { Container, Image, InputTextField, StyledFormControl, Textarea } from './createStyle';
import { Button } from '@mui/material';
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
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("file", file);
                // console.log("Data after appending:", data);
                try{
                    const response = await axios.post(`${API_URL}/file/upload`,data);
                    post.picture = response.data;
                    console.log("now the url of image is ",post.picture);
                }
                catch(error){
                    console.log("getting error while uploading the image in database ",error);
                }
            }
        }
        console.log("printing file in createPost ",file);
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file,account,location,post])
      

    const savePost = async () => {
        try{
            await API.createPost(post);
            navigate('/');
        }
        catch(error){
            console.log("getting error while saving post ",error);
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    name='file'
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
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