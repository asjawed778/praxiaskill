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
  Settings,
  Logout,
  Dashboard,
} from '@mui/icons-material';
import MenuBookIcon from '@mui/icons-material/MenuBook'; 
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/reducers/authReducer';
import toast from 'react-hot-toast';
import CustomButton from '../CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../services/auth.api';

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  console.log("User: ", user);
  
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutMutation();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      handleClose();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error?.data?.Message || "Logout failed");
    }
  };

  if (!user) return null;

  const menuItems = [
    user?.role === 'SUPER_ADMIN'
      ? { icon: <Dashboard />, label: 'Dashboard', to: '/dashboard' }
      : { icon: <MenuBookIcon />, label: 'My Courses', to: '/my-courses' },
    // { icon: <Person />, label: 'Profile', to: '/profile' },
    // { icon: <Settings />, label: 'Settings', to: '/settings' },
  ];

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar src={user?.profilePic} alt="profile" sx={{
      width: { xs: 28, sm: 32, md: 36 }, 
      height: { xs: 28, sm: 32, md: 36 },
      border: "2px solid white",
    }}/>
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
        {/* Top user info */}
        <Box display="flex" alignItems="center" gap={1} px={1.5} py={1}>
          <Avatar src={user?.profilePic} />
          <Box>
            <Typography fontWeight="bold">{user?.name}</Typography>
            <Typography variant="body2" color="text.secondary" fontSize="12px">
              {user?.role}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Menu Items */}
        {menuItems.map(({ icon, label, to }) => (
          <MenuItem
            key={label}
            onClick={() => {
              navigate(to);
              handleClose();
            }}
            sx={{ fontSize: "14px" }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            {label}
          </MenuItem>
        ))}

        <Divider sx={{ my: 1 }} />

        {/* Logout Button */}
        <CustomButton
          label="Logout"
          type="button"
          variant="outlined"
          color="secondary"
          startIcon={<Logout />}
          loading={isLoading}
          fullWidth
          onClick={handleLogout}
        />
      </Menu>
    </>
  );
};

export default Profile;
