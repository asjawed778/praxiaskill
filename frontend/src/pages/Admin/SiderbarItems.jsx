import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
 import CategoryIcon from '@mui/icons-material/Category';
  import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const sidebarItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/dashboard/courses",
    label: "Courses",
    icon: <MenuBookIcon />,
  },
  {
    path: "/dashboard/category",
    label: "Category",
    icon: <CategoryIcon />,
  },
  {
    path: "/dashboard/enquiry",
    label: "Enquiry",
    icon: <SupportAgentIcon />,
  },
  {
    path: "/dashboard/users",
    label: "Users",
    icon: <GroupOutlinedIcon />,
  },
];

export default sidebarItems;
