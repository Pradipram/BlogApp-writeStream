import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/dataProvider';
import { getAccessToken } from '../../../utils/common-utils';
import { API } from '../../../service/api';

//components
import Comment from './comment';
import axios from 'axios';
import { API_URL } from '../../../constants/config';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    // const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            try{
                // const response = await API.getAllComments(post._id);
                // if (response.isSuccess) {
                //     console.log("response.data is ",response.data);
                //     setComments(response.data);
                //     // console.log("comments",comments);
                // }
                const accessToken = getAccessToken();
                const config = {
                    headers: {
                      'Authorization': accessToken,
                    },
                  };
                const response = await axios.get(`${API_URL}/comments/${post._id}`,config);
                // console.log('response ',response);
                setComments(response.data);
            }
            catch(error){
                console.log("getting error while geting response from api call to get all comment ",error);
            }
        }
        getData();
    }, [post._id]);

    // useEffect(()=>{
    //     console.log("comments is updated ",comments);
    // },[comments]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        await API.newComment(comment);
        setComment(initialValue)
        // setToggle(prev => !prev);
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        // <Comment comment={comment} setToggle={setToggle} />
                        <Comment comment={comment} key={comment._id} />
                    ))
                }
                {/* {
                    comments && comments.length>0 && comments.map(c =>(
                        <div>comments.map is also valid</div>
                    ))
                }
                {
                    comments && <div>comments is valid</div>
                } */}
            </Box>
        </Box>
    )
}

export default Comments;