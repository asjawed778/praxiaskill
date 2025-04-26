const sidebarItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: "Dashboard",
  },

  {
    label: "Courses",
    icon: "MenuBookOutlined",
    children: [
      {
        path: "/dashboard/add-course",
        label: "Add Course",
        icon: "FileUploadOutlined",
      },
      {
        path: "/dashboard/manage-course",
        label: "Courses",
        icon: "VisibilityOutlined",
      },
      {
        path: "/dashboard/manage-category",
        label: "Category",
        icon: "PersonAddAlt",
      },
      {
        path: "/dashboard/course-enquiry",
        label: "Enquiry",
        icon: "HelpOutline",
      },
    ],
  },
  {
    path: "/dashboard/users",
    label: "Users",
    icon: "GroupOutlined",
  },
];

export default sidebarItems;
