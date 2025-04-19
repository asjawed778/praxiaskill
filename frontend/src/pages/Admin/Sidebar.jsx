// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FiHome } from "react-icons/fi";
// import { HiOutlineDesktopComputer } from "react-icons/hi";
// import { MdOutlineDashboard } from "react-icons/md";
// import { FiUpload } from "react-icons/fi";
// import { BsFillPersonCheckFill } from "react-icons/bs";
// import { FaEye } from "react-icons/fa";
// import { IoIosArrowForward } from "react-icons/io";
// import { IoMdArrowForward } from "react-icons/io";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { RxCross2 } from "react-icons/rx";
// import { FaQuestion } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { VscBookmark } from "react-icons/vsc";


// const sections = [
//   {
//     name: "courses",
//     accessRole: "SUPER_ADMIN",
//     redirectTO: null,
//     icon: <HiOutlineDesktopComputer />,
//     links: [
//       { url: "/dashboard/add-course", label: "Add Course", icon: <FiUpload /> },
//       { url: "/dashboard/manage-course", label: "Courses", icon: <FaEye /> },
//       { url: "/dashboard/manage-category", label: "Category", icon: <BsFillPersonCheckFill /> },
//       { url: "/dashboard/course-enquiry", label: "Enquiry", icon: <FaQuestion /> },
//     ],
//   },
//   {
//     name: "My Enrollment",
//     accessRole: "USER",
//     redirectTO: "/dashboard/my-enrollment",
//     icon: <VscBookmark />,
//     links: [],
//   },
// ];

// export default function Sidebar({ isOpen, setIsOpen, location }) {
//   const [drawer, setDrawer] = useState({});
//   const navigate = useNavigate()

//   const { user: {role: userRole} } = useSelector((state) => state.auth);

//   const toggleDropdown = (section) => {
//     setDrawer((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   useEffect(() => {
//     // On refreshing the page it will open the drawer
//     sections.forEach((section) => {
//       const isActive = section.links.some((link) => link.url === location.pathname);
//       if (isActive) {
//         setDrawer((prev) => ({ ...prev, [section.name]: true }));
//       }
//     });
//   }, [location.pathname]);

//   const handleSectionOnClick = (name, redirectTO) => {
//     toggleDropdown(name);
//     if(redirectTO)
//     {
//       navigate(redirectTO);
//     }
//   }

//   return (
//     <>
//       {/* Hamburger Menu Button (Only Visible on Small Screens) */}
//       {!isOpen && (
//         <button
//           className="lg:hidden fixed top-14 left-0 z-20 rounded bg-white text-black"
//           onClick={() => setIsOpen(true)}
//         >
//           <div className="w-7 h-6 bg-blue-500 hover:bg-[var(--color-primary)] rounded-r-md text-white flex justify-center items-center cursor-pointer">
//             <GiHamburgerMenu />
//           </div>
//         </button>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed z-50 inset-y-0 left-0 w-64 border-r overflow-y-auto bg-white border-neutral-300 max-h-full p-4 transition-transform duration-300 ease-in-out 
//       ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0 lg:static  lg:h-screen`}
//       >
//         {/* Close Button this will be only visible on small screen */}
//         <p
//           className="lg:hidden flex justify-end ml-auto text-2xl font-thin text-black"
//           onClick={() => setIsOpen(false)}
//         >
//           <RxCross2 className="hover:bg-neutral-200 rounded-full cursor-pointer" />
//         </p>

//         <Link to="/dashboard">
//           <div className={`flex gap-4 items-center mt-4 text-sm p-2 text-neutral-700 hover:bg-neutral-200 mb-0.5 rounded-md ${location.pathname === "/dashboard" && "bg-neutral-200 text-primary"}`}>
//             <FiHome />
//             <h2>Dashboard</h2>
//           </div>
//         </Link>

//         {sections.map(({ icon, name, links, accessRole, redirectTO }, index) => (
//           (userRole === accessRole || accessRole === "BOTH") ? <div key={index}>
//             <div
//               onClick={() =>{handleSectionOnClick(name, redirectTO)}}
//               className={`flex items-center justify-between py-2 rounded-md cursor-pointer hover:bg-neutral-200 ${location.pathname === redirectTO ? "bg-neutral-200 text-primary" : "text-neutral-700"}`}
//             >
//               <div className="flex items-center gap-4 text-sm px-2">
//                 {icon}
//                 <span className="capitalize text-sm">{name}</span>
//               </div>
//               {links.length > 0 && <svg
//                 className={`w-4 h-4 mr-2 transform transition-transform ${
//                   drawer[name] ? "rotate-180" : ""
//                 }`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>}
//             </div>

//             {drawer[name] && (
//               <div className="mt-2 rounded-md space-y-0.5">
//                 {links.map(({ url, label, icon }, index) => (
//                   <Link
//                     key={index}
//                     to={url}
//                     className={`block px-8 py-1.5 text-sm hover:bg-neutral-200 rounded-md ${location.pathname === url && "bg-neutral-200"}`}
//                   >
//                     <div className={`flex items-center text-xs gap-2 text-neutral-700 ${location.pathname === url && "text-primary"}`}>
//                       {location.pathname === url ? (
//                         <IoMdArrowForward className="mr-2" />
//                       ) : (
//                         <IoIosArrowForward className="mr-2" />
//                       )}
//                       {icon}
//                       <span className={`capitalize text-xs`}>{label}</span>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div> : null
//         ))}
//       </div>
//     </>
//   );
// }





// Added by irshad.....

import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
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
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Close from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setMobileOpen, toggleSidebar } from "../../store/reducers/sidebarSlice";
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
    console.log("toggle: ", toggleSidebar());
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
      bgcolor: colors.sidebarActiveBg, // background
      borderRadius: "8px",
  
      // Set overall text color (fallback)
      color: colors.sidebarActiveText,
  
      // Explicitly set icon color
      "& .MuiListItemIcon-root": {
        color: colors.sidebarActiveText,
      },
  
      // Explicitly set text color
      "& .MuiListItemText-root .MuiTypography-root": {
        color: colors.sidebarActiveText,
      },
  
      "&.Mui-selected, &.Mui-selected:hover": {
        bgcolor: colors.sidebarActiveBg,
      },
    }),
    [colors]
  );

  const activeIconStyles = useMemo(
    () => ({
      bgcolor: colors.sidebarActiveBg,
      color: colors.sidebarActiveText,
      borderRadius: "8px",
      "& .MuiListItemIcon-root": { color: colors.sidebarActiveIcon },
      "& .MuiTypography-root": { color: colors.sidebarActiveText }, // <- This targets text
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
        bgcolor: colors.sidebarBg,
        color: "red",
        borderRadius: "8px",
        boxSizing: "border-box",
        position: "fixed", // Keeps it fixed below the AppBar
        top: '4.5rem', // Push below AppBar
        height: 'calc(100vh - 4.5rem)',
        overflowX: 'hidden',
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        left: 0,
      },
    }}

  return (
    <Drawer {...drawerProps}>
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: open ? "flex-end" : "center",
            px: open ? 1 : 0,
          }}
        >
       
          <IconButton onClick={handleToggle} >
            {open ? <Icons.MenuOpen  /> : <Icons.Menu />}
          </IconButton>
        </Box>
      )}

      {/* --- Close Button for Mobile Sidebar --- */}
      {isMobile && (
        <IconButton
          onClick={() => dispatch(setMobileOpen(false))}
          sx={{ ml: "auto", mt: 1, }}
        >
          <Close />
        </IconButton>
      )}

      <List>
        {sidebarItems.map(({ label, icon, path, children }) => {
          const isOpen = openMenus[label];

          if (children) {
            return (
              <div key={label}>
                <Tooltip title={!open ? label : ""} placement="right">
                  <ListItemButton
                    onClick={() => handleClick(label)}
                    sx={{ borderRadius: "8px", fontSize: "0.875rem",
                      color: colors.sidebarText,
                     }}
                  >
                    <ListItemIcon
                      sx={{
                        color: colors.sidebarText,
                        minWidth: 40,
                        ...(isRouteActive(path) ? activeIconStyles : {}),
                      }}
                    >
                      {renderIcon(icon)}
                    </ListItemIcon>
                    {open && (
                      <>
                        <ListItemText
                          primary={label}
                          primaryTypographyProps={{
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: colors.sidebarText,
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
                              borderRadius: "8px",
                              ...(isRouteActive(subPath) ? activeStyles : {}),
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40,
                            color: colors.sidebarText,  
                            }}>
                              {renderIcon(subIcon)}
                            </ListItemIcon>
                            {open && (
                              <ListItemText
                                primary={subLabel}
                                primaryTypographyProps={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
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
              </div>
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
                  {renderIcon(icon)}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: colors.sidebarText,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    </Drawer>
  );
};
export default Sidebar;

