import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  useMediaQuery,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Close from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  setMobileOpen,
  toggleSidebar,
} from "../../store/reducers/sidebarSlice";
import sidebarItems from "./SiderbarItems";
import { useAppTheme } from "../../context/ThemeContext";

const drawerWidth = 240;
const collapsedWidth = 72;

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isMedium = useMediaQuery("(max-width: 768px)");
  const isLarge = useMediaQuery("(max-width: 1024px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { open, isMobileOpen } = useSelector((state) => state.sidebar);
  const [openMenus, setOpenMenus] = useState({});
  const { colors } = useAppTheme();

  useEffect(() => {
    const expanded = {};
    sidebarItems.forEach(({ label, children }) => {
      if (children?.some((sub) => sub.path === location.pathname)) {
        expanded[label] = true;
      }
    });
    setOpenMenus(expanded);
  }, [location.pathname]);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };
  const lastScreenRef = useRef("");
  useEffect(() => {
    let currentScreen = "large";

    if (isMobile) currentScreen = "small";
    else if (isMedium) currentScreen = "medium";

    if (lastScreenRef.current !== currentScreen) {
      lastScreenRef.current = currentScreen;

      if ((currentScreen === "small" || currentScreen === "medium") && open) {
        dispatch(toggleSidebar());
      }

      if (currentScreen === "large" && !open) {
        dispatch(toggleSidebar());
      }
    }
  }, [isMobile, isMedium, open, dispatch]);

  const handleClick = useCallback(
    (label) => {
      setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    },
    [setOpenMenus]
  );

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      if (isMobile) dispatch(setMobileOpen(false));
    },
    [navigate, isMobile, dispatch]
  );

  const renderIcon = useCallback((iconName) => {
    const IconComponent = Icons[iconName] || Icons.Help;
    return <IconComponent fontSize="small" />;
  }, []);

  const isRouteActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const activeStyles = useMemo(
    () => ({
      bgcolor: colors.sidebarActiveBg,
      borderRadius: "8px",

      color: colors.sidebarActiveText,

      "& .MuiListItemIcon-root": {
        color: colors.sidebarActiveText,
      },

      "& .MuiListItemText-root .MuiTypography-root": {
        color: colors.sidebarActiveText,
      },

      "&.Mui-selected, &.Mui-selected:hover": {
        bgcolor: colors.sidebarActiveBg,
      },
    }),
    [colors]
  );

  const drawerProps = {
    variant: isMobile ? "temporary" : "permanent",
    open: isMobile ? isMobileOpen : true,
    onClose: () => dispatch(setMobileOpen(false)),
    ModalProps: { keepMounted: true },
    sx: {
      width: open ? drawerWidth : collapsedWidth,
      transition: (theme) =>
        theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      "& .MuiDrawer-paper": {
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        // bgcolor: colors.sidebarBg,
        color: colors.primary,
        borderRadius: "8px",
        boxSizing: "border-box",
        position: "fixed",
        top: "4.5rem",
        height: "calc(100vh - 4.5rem)",
        overflowX: "hidden",
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        left: 0,
      },
    },
  };
  return (
    <>
      {isMobile && (
        <Box>
          <IconButton onClick={() => dispatch(setMobileOpen(true))}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}
      <Drawer {...drawerProps}>
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: open ? "flex-end" : "center",
              // px: 1,
            }}
          >
            <IconButton onClick={handleToggle}>
              {open ? <Icons.MenuOpen /> : <Icons.Menu />}
            </IconButton>
          </Box>
        )}
        <List>
          {sidebarItems.map(({ label, icon, path, children }) => {
            const isOpen = openMenus[label];

            if (children) {
              return (
                <Box key={label}>
                  <Tooltip title={!open ? label : ""} placement="right">
                    <ListItemButton
                      onClick={() => handleClick(label)}
                      sx={{
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        color: colors.sidebarText,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: colors.sidebarText,
                          minWidth: 40,
                          transition: "all 0.3s ease",
                          ...(isRouteActive(path) ? activeStyles : {}),
                        }}
                      >
                        {/* {renderIcon(icon)} */}
                        {icon}
                      </ListItemIcon>
                      {open && (
                        <>
                          <ListItemText
                            primary={label}
                            primaryTypographyProps={{
                              fontSize: "14px",
                              fontWeight: "600",
                              pl: 1,
                              color: colors.sidebarText,
                              transition: "all 0.3s ease",
                            }}
                          />
                          {isOpen ? (
                            <ExpandLess fontSize="small" />
                          ) : (
                            <ExpandMore fontSize="small" />
                          )}
                        </>
                      )}
                    </ListItemButton>
                  </Tooltip>

                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {children.map(
                        ({ label: subLabel, icon: subIcon, path: subPath }) => (
                          <Tooltip
                            key={subLabel}
                            title={!open ? subLabel : ""}
                            placement="right"
                          >
                            <ListItemButton
                              selected={isRouteActive(subPath)}
                              onClick={() => handleNavigate(subPath)}
                              aria-label={subLabel}
                              sx={{
                                color: colors.sidebarText,
                                pl: 4,
                                fontSize: "0.875rem",
                                fontWeight: "600",
                                // pl: 2,
                                borderRadius: "8px",
                                ...(isRouteActive(subPath) ? activeStyles : {}),
                              }}
                            >
                              <ListItemIcon
                                sx={{ minWidth: 40, color: colors.sidebarText }}
                              >
                                {/* {renderIcon(subIcon)} */}
                                {subIcon}
                              </ListItemIcon>
                              {open && (
                                <ListItemText
                                  primary={subLabel}
                                  primaryTypographyProps={{
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    // pl: 2,
                                    color: colors.sidebarText,
                                  }}
                                />
                              )}
                            </ListItemButton>
                          </Tooltip>
                        )
                      )}
                    </List>
                  </Collapse>
                </Box>
              );
            }
            return (
              <Tooltip key={label} title={!open ? label : ""} placement="right">
                <ListItemButton
                  selected={isRouteActive(path)}
                  onClick={() => handleNavigate(path)}
                  aria-label={label}
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: colors.sidebarText,
                    borderRadius: "8px",
                    ...(isRouteActive(path) ? activeStyles : {}),
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {/* {renderIcon(icon)} */}
                    {icon}
                  </ListItemIcon>
                  {open && (
                    <Box sx={{ pl: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "14px", 
                          fontWeight: 600,
                          color: colors.sidebarText,
                          ...(isRouteActive(path) ? activeStyles : {}),
                        }}
                      >
                        {label}
                      </Typography>
                    </Box>
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};
export default Sidebar;
