import { Avatar, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/Auth"
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../redux/actions/Auth"
import axios from "../../axios"

const UserAvatar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserDetails = () => {
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }
            axios.get("/users", config).then((response) => {
                if (response.data.status === "success") {
                    dispatch(setUser(response.data.result))
                }
            }).catch((error) => console.log(error))
        }
        getUserDetails()
    }, [dispatch])
    const user = useSelector(state => state.auth.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(logout())
    }
    const color = "#75cfb8"
    const userLetter = user?.name[0]
    const avatarStyle = { width: 40, height: 40, bgcolor: `${color}55`, color: color, fontSize: 23 }
    return (
        <div>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                {userLetter ? <Avatar sx={avatarStyle}>{userLetter}</Avatar> : <Avatar sx={avatarStyle} />}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        '& a': {
                            color: "#403c49"
                        },
                        "& .MuiMenuItem-root": {
                            color: "#403c49"
                        },
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link to="/home">
                    <MenuItem>
                        <ListItemIcon>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </MenuItem>
                </Link>
                <Link to="/settings">
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default UserAvatar
