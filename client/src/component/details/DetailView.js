import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'

import { API_URL } from '../../constants/config';
import { DataContext } from '../../context/dataProvider';


// components
import Comments from './comments/comments';
import axios from 'axios';
import { getAccessToken } from '../../utils/common-utils';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor : pointer
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        // const fetchData = async () => {
            // let response = await API.getPostById(id);
        //     if (response.isSuccess) {
        //         setPost(response.data);
        //     }
        // }
        // try{
        //     fetchData();
        // }
        // catch(error){
        //     console.log("getting error while fetching detail view ",error);
        // }
        const fetchData = async()=>{
            try{
                let response = await axios.get(`${API_URL}/post/${id}`,{
                    headers:{
                        authorization : getAccessToken()
                    }
                })
                console.log('post by id ',response);
                setPost(response.data);
            }
            catch(err){
                console.log("error in post by id ",err);
            }
        }
        fetchData();
    }, [id]);

    // useEffect(()=>{
    //     console.log("post ",post);
    // },[post]);

    const deleteBlog = async () => {  
        try{
            await axios.delete(`${API_URL}/delete/${post._id}`,{
                headers: {
                    authorization: getAccessToken(),
                },
            })
            // await API.deletePost(post._id);
            navigate('/')
        }
        catch(error){
            console.log("getting error while deleting post ",error);
        }
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Typography>{post.description}</Typography>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;