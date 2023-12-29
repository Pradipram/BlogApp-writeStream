import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from 'react';


import { UploadImage } from '../../service/ImageApi';
import { Heading, Image, SubHeading } from './bannerStyle';
import  { DataContext } from '../../context/dataProvider';


const Banner = () => {
    const [image,setImage] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const {account} = useContext(DataContext);

    useEffect(()=>{
        // console.log(account,'banner.js',16);
        setImageUrl(account.bannerUrl);
    },[account])

    useEffect(()=>{
        // console.log(imageUrl,32);
        const sendImage = async() =>{
            if(image){
                const formData = new FormData();
                formData.append('username',account.username);
                formData.append('image',image);
                // console.log(formData,'banner',36);
                const res = await UploadImage(formData);
                // console.log(res.data.imageUrl,'banner.js',40);
                setImageUrl(res.data.updatedUser.bannerUrl);
            }
            else{
                console.log("sorry but image is not as expected.");
            }
        }
        sendImage();
    },[image,account.username]);
    
    return (
        <Image sx={{background : `url(${imageUrl}) center/55% repeat-x #000`}}> 
            <Heading>BLOG</Heading>
            <SubHeading>Write Stream</SubHeading>
            <div className='Icon'>
                <label htmlFor='UploadImage' style={{cursor:'pointer'}}>
                    <EditIcon/>
                </label>
                <input type='file' id='UploadImage' style={{display:'none'}} onChange={(e)=>{ setImage(e.target.files[0]);}}/>
            </div>
        </Image>
    )
}

export default Banner;