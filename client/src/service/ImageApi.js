import axios from "axios";

export const UploadImage = async(formData)=>{
    // console.log(formData,'imageApi',2);
    const res = await axios.post(`/file/upload-image`,formData);
    console.log(res,'imageApi',6);
    return res;
}