import axios from "axios";
import { getAccessToken } from "../utils/common-utils";

export const createPost = async(post) =>{
    try{
        const res = await axios.post('/post/create',post,{
            headers:{
                Authorization : getAccessToken()
            }
        });
        return res;
    }
    catch(err){
        return err.response;
    }
}