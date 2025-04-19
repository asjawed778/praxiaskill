

const sidebarItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: "Dashboard",
  },

  {
    label: "Courses",
    icon: "MenuBook",
    children: [
      {
        path: "/dashboard/add-course",
        label: "Add Course",
        icon: "FileUpload",
      },
      {
        path: "/dashboard/manage-course",
        label: "Courses",
        icon: "Visibility",
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
];

export default sidebarItems;
