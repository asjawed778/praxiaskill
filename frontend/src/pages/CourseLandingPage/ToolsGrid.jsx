import React, { createElement } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";

const iconLibraries = {
  Fa: FaIcons,
  Si: SiIcons,
  Md: MdIcons,
};

const getIconComponent = (iconName) => {
  if (!iconName || iconName.length < 3) return null;
  const prefix = iconName.slice(0, 2);
  const lib = iconLibraries[prefix];
  return lib?.[iconName] || null;
};

const ToolsGrid = ({ course }) => {
  if (!course?.tools?.length === 0 || !course?.tools) return;

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
        sx={{ mb: 4, fontSize: { xs: "24px", sm: "36px", md: "44px" } }}
      >
        {course?.tools?.length < 5
          ? `Master ${course?.tools?.length} Tools`
          : `Master ${Math.floor(course?.tools?.length / 5) * 5}+ Tools`}
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4, mx: { xs: 1, sm: 2, md: 16 } }}
      >
        {course.tools.map((item, index) => (
          <Grid item key={index} xs={4} sm={3} lg={2}>
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
                {item.url ? (
                  <img src={item.url} alt={item.name} width={50} height={50} />
                ) : getIconComponent(item.iconName) ? (
                  createElement(getIconComponent(item.iconName), {
                    size: 35,
                  })
                ) : (
                  <Typography variant="caption" color="error">
                    Icon not found
                  </Typography>
                )}
              </Card>
              <CardContent sx={{ p: 1 }}>
                <Typography variant="body2" fontWeight="medium" align="center">
                  {item.name}
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
