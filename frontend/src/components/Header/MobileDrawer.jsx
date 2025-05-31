import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Link,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '@/store/reducers/authReducer';

const MobileDrawer = ({ open, onClose, navItems, colors }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleNavigate = (to) => {
    navigate(to);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 260,
          // height: "50%",
          padding: 2,
          backgroundColor: colors.background,
        },
      }}
    >
      <Box role="presentation">
        <Typography
          variant="h6"
          sx={{ color: colors.primary, fontWeight: 600 }}
        >
          Menu
        </Typography>

        <List>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <ListItem key={item.to} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(item.to)}
                  sx={{
                    borderRadius: 1,
                    backgroundColor: isActive ? colors.primary : "transparent",
                    color: isActive ? "#fff" : colors.text,
                    "&:hover": {
                      backgroundColor: colors.secondary,
                      color: "#fff",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="tel:+919123735554">
              <ListItemText primary="+91 91237 35554" />
            </ListItemButton>
          </ListItem>

          {!isAuthenticated ? (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigate("/auth")}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigate("/auth")}>
                  <ListItemText primary="Signup" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
