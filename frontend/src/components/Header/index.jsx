import React from "react";
import { AppBar, Toolbar, Box, Link } from "@mui/material";
import CustomButton from "../CustomButton";
import logo from "../../../src/assets/logo.png";
import { useAppTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import Profile from "./Profile";

const Header = () => {
  const { colors } = useAppTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

const NavItem = ({ to, label }) => (
  <>
  <Box
    sx={{
      color: colors.primary,
      fontWeight: 500,
      paddingBottom: "4px",
      borderBottom: "2px solid transparent",
      transition: "all 0.3s ease",
      "&:hover": {
        color: colors.secondary,
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
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Link href="/" underline="none">
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ height: 40, cursor: "pointer" }}
              />
            </Link>

            {/* Navigation Links */}
            <Box sx={{ display: "flex", gap: 4, fontSize: "14px" }}>
            <NavItem to="/courses" label="Learning" />
            <NavItem to="/contact-us" label="Contact Us" />
            </Box>
          </Box>

          {/* Right section */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Link
              href="tel:+919123735554"
              underline="none"
              sx={{
                color: colors.primary,
                "&:hover": {
                  color: colors.secondary,
                },
              }}
            >
              +91 91237 35554
            </Link>

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
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
    
  </>
  );
};

export default Header;
