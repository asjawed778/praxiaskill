import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGithub,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiJsonwebtokens,
  SiGraphql,
  SiFirebase,
  SiPostman,
  SiVercel,
  SiEslint,
  SiPrettier,
  SiZod,
  SiGithubactions,
} from "react-icons/si";
import { VscServer } from "react-icons/vsc";
import { FaCheckCircle } from "react-icons/fa";

const iconMap = {
  HTML: <FaHtml5 size={40} color="#e34c26" />,
  CSS: <FaCss3Alt size={40} color="#264de4" />,
  JavaScript: <FaJsSquare size={40} color="#f0db4f" />,
  "React.js": <FaReact size={40} color="#61DBFB" />,
  "Next.js": <SiNextdotjs size={40} />,
  "Node.js": <FaNodeJs size={40} color="#3c873a" />,
  "Express.js": <SiExpress size={40} />,
  MongoDB: <SiMongodb size={40} color="#47A248" />,
  PostgreSQL: <SiPostgresql size={40} color="#336791" />,
  "JWT Auth": <SiJsonwebtokens size={40} />,
  "REST API": <VscServer size={40} />,
  GraphQL: <SiGraphql size={40} color="#e535ab" />,
  "Git & GitHub": <FaGithub size={40} />,
  Docker: <FaDocker size={40} color="#0db7ed" />,
  "CI/CD": <SiGithubactions size={40} />,
  Firebase: <SiFirebase size={40} color="#FFCA28" />,
  AWS: <FaAws size={40} />,
  Postman: <SiPostman size={40} color="#ff6c37" />,
  Vercel: <SiVercel size={40} />,
  ESLint: <SiEslint size={40} color="#4B32C3" />,
  Prettier: <SiPrettier size={40} color="#F7B93E" />,
  Zod: <SiZod size={40} />,
  Yup: <FaCheckCircle size={24} />,
};

const toolNames = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "JWT Auth",
  "REST API",
  "GraphQL",
  "Git & GitHub",
  "Docker",
  "CI/CD",
  "Firebase",
  "AWS",
  "Postman",
  "Vercel",
  "ESLint",
  "Prettier",
  "Zod",
  "Yup",
];

const ToolsGrid = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography
        component="h2"
        textAlign="center"
        fontWeight="bold"
        sx={{
          mb: 4,
          fontSize: { xs: "24px", sm: "36px", md: "44px" },
        }}
      >
        Master 20+ Tools
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4, mx: { xs: 1, sm: 2, md: 16 } }}
      >
        {toolNames.map((name, index) => (
          <Grid key={index} size={{ xs: 4, sm: 3, lg: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "#150d1f",
                  color: "#fff",
                  borderRadius: 2,
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  textAlign: "center",
                  py: 3,
                  height: "80px",
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                elevation={4}
              >
                {iconMap[name]}
              </Card>
              <CardContent sx={{ p: 1 }}>
                <Typography variant="body2" fontWeight="medium" align="center">
                  {name}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ToolsGrid;
