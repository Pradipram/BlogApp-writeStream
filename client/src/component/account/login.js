// import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useContext, useState } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/dataProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/config";
import { Component, Error, LoginButton, SignupButton, Text, Wrapper } from "./loginStyle";
import { Box, TextField } from "@mui/material";
import { userLoginEvent } from "../../service/userApi";

export  const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

export  const loginInitialValues = {
  username: '',
  password: ''
};

export  const signuperrorinit = {
  name:'',
  username:'',
  password:''
}

const Login = ({isUserAuthenticated}) => {
    const [account,toggleAccount] = useState('login');
    const [signup,setSignup] = useState(signupInitialValues);
    const [error,setError] = useState("");
    const [login,setLogin] = useState(loginInitialValues);
    const [signuperror,setSignuperror] = useState(signuperrorinit); 

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
      setError('');
      setSignuperror(signuperrorinit);
      account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
      setError('');
      setSignuperror(signuperrorinit);
      // if(e.target.value.includes(' '))
      setSignup({ ...signup, [e.target.name]: e.target.value });
      // console.log(signup.username);
    }

    const signupUser = async () => {
      setError('');
      setSignuperror(signuperrorinit);
      if (signup.username.includes(' ')) {
        setSignuperror((prevErrors) => ({
          ...prevErrors,
          username: "Username must not contain space",
        }));
        // Note: The state update is asynchronous, so you won't see the updated state immediately here.
        // Instead, you can log the state in a useEffect or use the updated state in the next render.
      }
      else if(signup.password.includes(' ')){
        setSignuperror((prevErrors) =>(
          {...prevErrors,
          password: "Password must not contain space"}
        ))
      }
      else{
        try {
          const response = await axios.post(`${API_URL}/signup`,signup);
          // console.log("response",response);
          alert(response.data.msg);
          toggleAccount('login');
        } catch (error) {
          console.log("error",error);
          setSignuperror(error.response.data);
          // alert("something unexpected happened.Please try again");
        }
      }
    };  
    
    const onValueChange = (e) =>{
      setError('');
      setSignuperror(signuperrorinit);
      setLogin({...login,[e.target.name] :e.target.value })
    }

    const loginUser = async () => {
      setError('');
      setSignuperror(signuperrorinit);
      try { 
      let res = await API.userLogin(login);
      if (res.isSuccess) {
        // showError('');
        
        sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${res.data.refreshToken}`);

        localStorage.setItem("useremail", res.data.username);
        setAccount({ name: res.data.name, username: res.data.username,bannerUrl:res.data.bannerUrl });
        
        //send an event that user has been logged into the website
        const indiaTimezone = 'Asia/Kolkata';
        const date = new Date();
        const options = {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: indiaTimezone,
          timeZoneName: 'short'
        };
        

        let userDetails = {
          useremail: res.data.username,
          timestamp : date.toLocaleString('en-IN', options)
        }
        const eventRes = await userLoginEvent(userDetails)
        console.log(eventRes);

        isUserAuthenticated(true)
        setLogin(loginInitialValues);
        navigate('/');
      } else {
        // showError('Something went wrong! please try again later');
          // console.log("response i am getting is ",res.response);
          if(res.response && res.response.status === 400){
            setError("Wrong Username or password !");
          }
          else{
            setError("something went wrong please try again lator");
          }
      }
      }
      catch(error){
        setError("user does not exist. Click on signUp to register");
      }
  }

  return (
    <Component>
      <Box>
        {/* <Image src={imageUrl} alt="Image not found" /> */}
        <div className="login">
           <h1 className="writeStream">Write Stream</h1>
        </div>
        {
            account === 'login' ?
                <Wrapper>
                    <TextField variant="standard" label = "Enter Username" onChange={(e)=>onValueChange(e)} name="username"/>
                    <TextField variant="standard" label = "Enter Password" onChange={(e)=>onValueChange(e)} name="password"/>

                    {error && <Error>{error}</Error>}
                    <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
                    <Text>OR</Text>
                    <SignupButton onClick={toggleSignup}>Create an account</SignupButton>
                </Wrapper>
                :
                <Wrapper>
                    <TextField variant="standard" label = "Enter Name" name="name" onChange ={(e)=>onInputChange(e)}/>
                    <Error>{signuperror.name}</Error>
                    <TextField variant="standard" label = "Enter Username" name="username"
                    onChange={(e)=>onInputChange(e)}/>
                    <Error>{signuperror.username}</Error>
                    <TextField variant="standard" label = "Enter Password" name="password" onChange={(e)=>onInputChange(e)}/>
                    <Error>{signuperror.password}</Error>
                    <SignupButton onClick={()=>signupUser()}>Sign UP</SignupButton>
                    <Text>OR</Text>
                    <LoginButton onClick={toggleSignup} variant="contained">Already have an account</LoginButton>
                </Wrapper>
        }

      </Box>
    </Component>
  );
};

export default Login;
