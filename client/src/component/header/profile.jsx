//Libraries
import React from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";


//Components

function UserProfileDrawer({
  open,
  onClose,
  stringAvatar,
  name,
  user,
}) {
//   const navigate = useNavigate();

  const inputString = name; // Replace this with your string
  const words = inputString.split(" ");
  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");


  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="drawer">
        <div className="profile">
          <Avatar {...stringAvatar(name)} />
          <h1 style={{margin:'0'}}>{formattedString}</h1>
          <h4 style={{ color: "#8c95de" ,margin:0}}>@{user}</h4>
        </div>
        <Link to='/login' className="logout">
            <span>LOGOUT</span>
            <LogoutIcon sx={{marginLeft:'5px'}} fontSize="small"/>
        </Link>
      </div>
    </Drawer>
  );
}

export default UserProfileDrawer;
