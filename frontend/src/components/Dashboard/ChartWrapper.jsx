import { Card, CardContent, Typography } from "@mui/material";

const ChartWrapper = ({ title, children }) => {
  return (
    <Card  sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartWrapper;
