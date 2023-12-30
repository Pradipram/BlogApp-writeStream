import { AppBar, Avatar, Toolbar, styled} from '@mui/material'; 
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/dataProvider';
import UserProfileDrawer from './profile';

const Component = styled(AppBar)`
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`

const Header = () => {
    const {account} = useContext(DataContext);
  const [drawerOpen, setDrawerOpen] = useState(false);


    function stringToColor(string) {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = "#";
        for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        return color;
    }

    function stringAvatar(name) {
        return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()}`,
        };
    }

  const handleAvatarClick = () => {
    // console.log("avatar is clicked")
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <div onClick={handleAvatarClick} style={{ cursor: "pointer",position:'fixed',right:'10px' }}>
                    <Avatar {...stringAvatar(account.name)}/>
                </div>
                <UserProfileDrawer open={drawerOpen} onClose={handleCloseDrawer} stringAvatar={stringAvatar} name={account.name} user={account.username}/>
            </Container>
        </Component>
    )
}

export default Header;