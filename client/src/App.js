import { useState } from "react";
import "./App.css"
import Login from "./component/account/login"
import Header from "./component/header/Header";
import Home from "./component/home/home";
import DataProvider from "./context/dataProvider";
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import CreatePost from "./component/create/createPost";
import DetailView from "./component/details/DetailView";
import Update from "./component/create/updata";
import About from "./component/about/About";
import Contact from "./component/contact/Contact";

const PrivateRoute = ({isAuthenticated,...props}) =>{
  console.log(isAuthenticated);
  return isAuthenticated ?
  <>
    <Header/> 
    <Outlet/>
  </>
  :
  <Navigate replace to={'/login'}/>
}

function App() {

  const [isAuthenticated,isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App" style={{marginTop : 64}}>
          <Routes>
            <Route path="/login" element ={<Login isUserAuthenticated = {isUserAuthenticated}/>}/>

            <Route path="/" element = {<PrivateRoute isAuthenticated = {isAuthenticated}/>}>
              <Route path="/" element = {<Home/>}/>
            </Route>
            <Route path="/create" element = {<PrivateRoute isAuthenticated = {isAuthenticated}/>}>
              <Route path="/create" element = {<CreatePost/>}/>
            </Route>
            <Route path="/details/:id" element = {<PrivateRoute isAuthenticated = {isAuthenticated}/>}>
              <Route path="/details/:id" element = {<DetailView/>}/>
            </Route>
            <Route path="/update/:id" element = {<PrivateRoute isAuthenticated = {isAuthenticated}/>}>
              <Route path="/update/:id" element = {<Update/>}/>
            </Route>
            <Route path="/about" element = {<PrivateRoute isAuthenticated = {isAuthenticated}/>}>
              <Route path="/about" element = {<About/>}/>
            </Route>
            <Route path="/contact" element = {<PrivateRoute isAuthenticated = {isAuthenticated}/>}>
              <Route path="/contact" element = {<Contact/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
