import React from "react";
import { CardContent, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppTheme } from "../../context/ThemeContext";

const CustomBarChart = ({ data }) => {
  const { colors } = useAppTheme();
  return (
    <Box sx={{ height: "220px", width: "100%" }}>
      <CardContent>
        <Box sx={{ height: "220px", mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              {/* <XAxis dataKey="name" axisLine={false} tickLine={false} /> */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                angle={-35}
                textAnchor="end"
                height={80}
              />

              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar
                dataKey="count"
                fill={colors.barChartColor}
                barSize={40}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Box>
  );
};

export default CustomBarChart;
