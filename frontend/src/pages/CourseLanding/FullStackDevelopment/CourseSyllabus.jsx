import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const syllabusData = [
  {
    id: "module1",
    title: "Web Development & Internet Basics",
    points: [
      "What is Web Development? Frontend vs Backend vs Full Stack",
      "How the Web Works: Servers, Clients, DNS, IP, HTTP/HTTPS",
      "Domain Names, Hosting, Web Server Basics",
      "Static vs Dynamic Websites",
      "Introduction to VS Code, Chrome DevTools",
      "Overview of Web Developer Career Roadmap",
    ],
    assignments: ["Create a document: “How the Internet Works”"],
    projects: ["Build a static resume page with basic HTML"],
  },
  {
    id: "module2",
    title: "HTML5 (HyperText Markup Language)",
    points: [
      "HTML Syntax & Structure",
      "Semantic Tags (header, footer, section, article, nav)",
      "Forms, Input Types & Form Validation",
      "Lists, Tables, Images, Audio, Video",
      "Meta Tags & SEO Basics",
      "Accessibility (alt tags, labels, ARIA roles)",
    ],
    assignments: ["Create a registration form using HTML"],
    projects: ["Build a responsive single-page portfolio layout (HTML only)"],
  },
  {
    id: "module3",
    title: "CSS3 (Cascading Style Sheets)",
    points: [
      "CSS Syntax, Selectors, and Properties",
      "Box Model, Margin, Padding, Border",
      "Positioning: static, relative, absolute, fixed",
      "Display: block, inline, inline-block, flex",
      "Flexbox: justify-content, align-items, etc.",
      "CSS Grid: rows, columns, grid-gap, etc.",
      "Transitions, Animations",
      "Media Queries for Responsive Design",
      "CSS Variables and Best Practices",
    ],
    assignments: ["Recreate a landing page from image or Figma file"],
    projects: ["Responsive multipage business website (HTML + CSS)"],
  },
  {
    id: "module4",
    title: "Tailwind CSS",
    points: [
      "What is Tailwind? Utility-first framework",
      "Installing Tailwind and using it with VS Code",
      "Working with Layouts: Flex, Grid, Spacing",
      "Components: Buttons, Cards, Forms, Navbars",
      "Responsive Design with Tailwind",
      "Dark Mode & Customization",
      "Building and Reusing Components",
    ],
    assignments: ["Recreate a startup landing page in Tailwind"],
    projects: ["Complete UI of a SaaS product with Tailwind"],
  },
  {
    id: "module5",
    title: "JavaScript (Basic to Intermediate)",
    points: [
      "JS Syntax, Variables (var, let, const)",
      "Data Types, Operators, Conditions",
      "Functions, Scope, Hoisting",
      "Arrays and Array Methods (map, filter, reduce)",
      "Loops: for, while, forEach",
      "Objects and Object Manipulation",
      "DOM Manipulation (getElement, querySelector, etc.)",
      "Events and Event Listeners",
      "Forms and Input Validation",
      "Date, Math, and Utility Functions",
      "Local Storage / Session Storage",
      "JSON Basics and Data Parsing",
    ],
    assignments: ["Calculator", "Form Validator"],
    projects: ["To-do App", "Quiz App (MCQ Format)"],
  },
  {
    id: "module6",
    title: "Git & GitHub",
    points: [
      "What is Git? Why use Version Control",
      "Git CLI: init, add, commit, push, pull",
      "Branching, Merging, Conflict Resolution",
      "Creating Repositories on GitHub",
      "Pull Requests and Collaboration",
      "GitHub Pages Deployment",
    ],
    assignments: ["Upload your portfolio to GitHub"],
    projects: ["Group-based website collaboration project"],
  },
  {
    id: "module7",
    title: "Advanced JavaScript",
    points: [
      "Closures, Callbacks, Promises",
      "Async/Await and Fetch API",
      "Higher Order Functions",
      "Destructuring, Spread, Rest Operators",
      "Template Literals",
      "ES6 Modules & Imports",
      "Error Handling (try/catch)",
      "Debouncing & Throttling",
      "Introduction to AJAX and REST APIs",
    ],
    assignments: ["Fetch and display API data"],
    projects: ["Weather App (API-based)", "Movie Search App (OMDb API)"],
  },
  {
    id: "module8",
    title: "React.js (Frontend Framework)",
    points: [
      "What is React? Why React?",
      "JSX Syntax",
      "Components: Functional & Class",
      "Props & State",
      "Handling Events & Forms",
      "Conditional Rendering",
      "Lists & Keys",
      "useState and useEffect Hooks",
      "Routing with React Router",
      "Working with APIs using Axios/Fetch",
      "Component Reusability & File Structure",
    ],
    assignments: ["Task Manager", "Dynamic Product Listing"],
    projects: ["Notes App", "Blog App Frontend (React + API Integration)"],
  },
  {
    id: "module9",
    title: "Next.js (Advanced Frontend + SSR)",
    points: [
      "What is Next.js? SSR vs CSR",
      "File-based Routing",
      "Static Site Generation (SSG)",
      "Server-Side Rendering (SSR)",
      "API Routes in Next.js",
      "Image Optimization & Head Metadata",
      "Deployment with Vercel",
      "Environment Variables",
    ],
    projects: [
      "Developer Portfolio with Next.js",
      "Blog Website with Markdown or CMS (e.g., Sanity)",
    ],
  },
  {
    id: "module10",
    title: "Node.js & Express.js (Backend Development)",
    points: [
      "Introduction to Node.js",
      "Node Package Manager (npm)",
      "Express.js Fundamentals",
      "REST API Design",
      "Routes, Middleware, and Controllers",
      "Connecting MongoDB with Mongoose",
      "CRUD Operations",
      "Authentication (JWT, bcrypt)",
      "File Upload using Multer",
      "API Security and Error Handling",
    ],
    assignments: ["User Authentication System", "Product CRUD API"],
    projects: ["Auth Backend with Express", "REST API for Blog CMS"],
  },
  {
    id: "module11",
    title: "MongoDB (Database)",
    points: [
      "What is NoSQL?",
      "MongoDB Atlas Setup",
      "CRUD with MongoDB",
      "Mongoose Models & Schemas",
      "Data Validation",
      "Relationships (1:1, 1:N)",
      "Aggregation Pipeline (Intro)",
      "Backend + DB Integration",
    ],
    projects: ["Blog Database Model", "Contact Form + Data Storage API"],
  },
  {
    id: "module12",
    title: "Full Stack MERN Integration",
    points: [
      "Connecting React Frontend with Node Backend",
      "Using Axios to call APIs",
      "JWT Authentication Flow (Login, Signup)",
      "Form Handling with React",
      "Protected Routes (Frontend + Backend)",
      "User Role Management (Admin/User)",
      "Flash Messages and Toast Notifications",
      "File Upload Integration",
      "Pagination, Search & Filtering",
    ],
    projects: [
      "Job Portal (Admin + User)",
      "E-Commerce Web App",
      "Blogging Platform with Admin Dashboard",
    ],
  },
  {
    id: "module13",
    title: "Deployment & DevOps Basics",
    points: [
      "Frontend Deployment: Netlify, Vercel",
      "Backend Deployment: Render, Railway, Cyclic",
      "AWS EC2 Setup + Linux Basics",
      "Using PM2 and Nginx for Node.js",
      "Domain Mapping with Custom Domain",
      "SSL Certificate & HTTPS Setup",
      "Using Environment Variables Securely",
    ],
    projects: ["Deploy your Full Stack App Live", "AWS EC2 Hosting Demo"],
  },
  {
    id: "capstone",
    title: "Final Capstone Project",
    points: [
      "Choose one of the following:-",
      "Online Learning Platform (LMS)",
      "Freelance Services Marketplace",
      "Blogging CMS with Rich Text",
      "Admin Panel Dashboard (CRUD + Auth + Charts)",
    ],
    finalDeliverables: [
      "Source Code on GitHub",
      "Hosted Live App",
      "Video Walkthrough or Final Demo",
      "Certificate Issued Upon Completion",
    ],
  },
];

const CourseSyllabus = () => {
  const [expanded, setExpanded] = useState("module1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#0d0d0d",
        minHeight: "100vh",
        py: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h2"
          color= "#00e676"
          fontWeight="bold"
          textAlign= "center"
          sx={{
            mb: {xs: 4, md: 8},
            fontSize: { xs: '28px', sm: '36px', md: '44px' },
          }}
        >
          Course Syllabus
        </Typography>

        {syllabusData.map((module) => (
          <Accordion
            key={module.id}
            expanded={expanded === module.id}
            onChange={handleChange(module.id)}
            sx={{
              bgcolor: "#1a1a1a",
              mb: 2,
              borderLeft: "6px solid #00e676",
              borderRadius: 2,
              boxShadow: "0 0 10px rgba(0, 230, 118, 0.2)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#00e676" }} />}
              aria-controls={`${module.id}-content`}
              id={`${module.id}-header`}
              sx={{
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 1.5 },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
              >
                <Chip
                  label={
                    module.id.startsWith("module")
                      ? module.id.replace("module", "Module ")
                      : "Capstone"
                  }
                  sx={{
                    mr: 2,
                    mb: { xs: 1, sm: 0 },
                    bgcolor: "#00e676",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: { xs: 16, sm: 20 },
                  }}
                >
                  {module.title}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
              <List dense>
                {module.points.map((point, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "#00e676" }} />
                    </ListItemIcon>
                    <ListItemText primary={point} sx={{ color: "#ccc" }} />
                  </ListItem>
                ))}
              </List>

              {module.assignments && (
                <>
                  <Divider sx={{ my: 2, borderColor: "#333" }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#00e676", fontWeight: 600 }}
                  >
                    Assignments
                  </Typography>
                  <List dense>
                    {module.assignments.map((assignment, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: "#00e676" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={assignment}
                          sx={{ color: "#ccc" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {module.projects && (
                <>
                  <Divider sx={{ my: 2, borderColor: "#333" }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#00e676", fontWeight: 600 }}
                  >
                    Projects
                  </Typography>
                  <List dense>
                    {module.projects.map((project, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: "#00e676" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={project}
                          sx={{ color: "#ccc" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {module.finalDeliverables && (
                <>
                  <Divider sx={{ my: 2, borderColor: "#333" }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#00e676", fontWeight: 600 }}
                  >
                    Final Deliverables
                  </Typography>
                  <List dense>
                    {module.finalDeliverables.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: "#00e676" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          sx={{ color: "#ccc" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default CourseSyllabus;
