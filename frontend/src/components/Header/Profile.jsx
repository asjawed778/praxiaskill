import React, { useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  Box,
  ListItemIcon,
} from '@mui/material';
import {
  Person,
  Message,
  Notifications,
  Settings,
  Logout,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/reducers/authReducer';
import toast from 'react-hot-toast';
import CustomButton from '../CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../services/auth.api';

const menuItems = [
  { icon: <Person />, label: 'Profile' },
  { icon: <Settings />, label: 'Settings' },
];

const  Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const [logoutUser, {isLoading}] = useLogoutMutation();
  console.log("User", user);
  
  
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap(); 
      console.log("Logout response: ", response);
      handleClose();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error?.data?.Message || "Logout failed");    }
  };

  if(!user) return null;
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar src={user?.profilePic} alt="profile" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 200,
              borderRadius: 3,
              mt: 1.5,
              p: 1,
              fontSize: "14px",
              overflow: 'visible',
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 16,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                boxShadow: '-1px -1px 1px rgba(0,0,0,0.1)',
              },
            },
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={1} px={1.5} py={1}>
          <Avatar src={user?.profilePic} />
          <Box>
            <Typography fontWeight="bold">{user?.name}</Typography>
            <Typography variant="body2" color="text.secondary" 
            fontSize="12px"
            >
              {user?.role}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {menuItems.map(({ icon, label }) => (
          <MenuItem key={label} onClick={handleClose} sx={{ fontSize: "14px" }}>
            <ListItemIcon  >{icon}</ListItemIcon >
            {label}
          </MenuItem>
        ))}

        <Divider sx={{ my: 1 }} />
           <CustomButton label="logout" type='button' variant='outlined' color='secondary'   startIcon={<Logout />} loading={isLoading} fullWidth onClick={handleLogout} />
      </Menu>
    </>
  );
};
export default Profile;
