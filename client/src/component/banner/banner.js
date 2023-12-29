import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from 'react';


import { UploadImage } from '../../service/ImageApi';
import { Heading, Image, SubHeading } from './bannerStyle';
import  { DataContext } from '../../context/dataProvider';
import { updateUser } from '../../service/userApi';


const Banner = () => {
    const [image,setImage] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const {account,setAccount} = useContext(DataContext);

    useEffect(()=>{
        // console.log(account,'banner.js',16);
        setImageUrl(account.bannerUrl);
    },[account])

    
    useEffect(()=>{
        const sendImage = async() =>{
            if(image){
                // console.log(image,'banner.js',24);
                const formData = new FormData();
                formData.append('image',image);
                // console.log(formData,'banner',36);
                const imageRes = await UploadImage(formData);
                // console.log(imageRes,'banner.js',30);
                if(imageRes.data.imageUrl){
                    const user = {
                        username:account.username,
                        bannerUrl:imageRes.data.imageUrl
                    }
                    const res = await updateUser(user);
                    if(res.data.updatedUser){
                        // console.log(res,'banner.js',37);
                        // console.log(res.data.updatedUser.bannerUrl,'banner.js',39);
                        setImageUrl(res.data.updatedUser.bannerUrl);
                        setAccount({bannerUrl:res.data.updatedUser.bannerUrl});
                    }
                }
            }
            else{
                console.log("sorry but image is not as expected."); 
            }
        }
        sendImage();
    },[account.username,image,setAccount]);
    
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