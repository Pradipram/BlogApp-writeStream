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

export const userLoginEvent = async(userDetails) =>{
    try{
        const res = await axios.post("http://localhost:8001/login-event",userDetails);
        console.log(res)
    }
    catch(error){
        console.log("getting error while sending the event to the python server")
    }
}