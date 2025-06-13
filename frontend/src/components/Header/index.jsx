import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CustomButton from "../CustomButton";
import logo from "../../../src/assets/logo-red-transparent-bg.png";
import { useAppTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import Profile from "./Profile";
import MobileDrawer from "./MobileDrawer";
const Header = () => {
  const { colors } = useAppTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openDrawer, setOpenDrawer] = useState(false);

  const isMobile = useMediaQuery("(max-width: 700px)");
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Learning" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  const NavItem = ({ to, label }) => (
    <Box
      sx={{
        color: colors.primary,
        fontWeight: 500,
        paddingBottom: "4px",
        borderBottom: "2px solid transparent",
        transition: "all 0.2s ease",
        "&:hover": {
          color: colors.secondary,
          transform: "scale(1.1)",
        },
      }}
    >
      <NavLink
        to={to}
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? colors.secondary : "inherit",
          borderBottom: isActive
            ? `2px solid ${colors.primary}`
            : "2px solid transparent",
        })}
      >
        {label}
      </NavLink>
    </Box>
  );

  return (
    <Box>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          backgroundColor: colors.background,
          color: colors.text,
        }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              px: {xs: 1, md: 6, lg: 15 }, 
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo and Nav */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <NavLink to="/" underline="none">
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{ height: 40, cursor: "pointer" }}
                />
              </NavLink>

              {!isMobile && (
                <Box sx={{ display: "flex", gap: 4, fontSize: "14px" }}>
                  {navItems.map((item) => (
                    <NavItem key={item.to} to={item.to} label={item.label} />
                  ))}
                </Box>
              )}
            </Box>

            {/* Right side */}
            <Box
              sx={{
                display: "flex",
                gap: { xs: 0.5, sm: 1, md: 2 },
                alignItems: "center",
              }}
            >
              {!isMobile && (
                <Link
                  href="tel:+919123735554"
                  underline="none"
                  sx={{
                    color: colors.primary,
                    fontSize: "14px",
                    "&:hover": {
                      color: colors.secondary,
                    },
                  }}
                >
                  +91 91237 35554
                </Link>
              )}

              {isAuthenticated ? (
                <Profile />
              ) : (
                <>
                  <CustomButton
                    label="Login"
                    variant="outlined"
                    onClick={() => navigate("/auth")}
                  />
                  <CustomButton
                    label="Signup"
                    onClick={() => navigate("/auth")}
                  />
                </>
              )}

              {/* Show menu icon only on mobile */}
              {isMobile && (
                <IconButton onClick={() => setOpenDrawer(true)}>
                  <MenuIcon sx={{ color: colors.primary }} />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <MobileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        navItems={navItems}
        colors={colors}
      />
    </Box>
  );
};

export default Header;
