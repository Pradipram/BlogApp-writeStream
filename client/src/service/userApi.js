import axios from "axios";

export const updateUser = async(user)=>{
    try{
        const res = await axios.put('/update-user',user);
        // console.log(res,'userApi',6);
        return res;
    }
    catch(err){
        return err;
    }
}