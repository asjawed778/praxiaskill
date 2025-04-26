import React from 'react';
import { CardContent, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppTheme } from '../../context/ThemeContext';

const CustomLineChart = ({ data }) => {
  const { colors } = useAppTheme();
  return (
    <Box sx={{ height: '100%', maxHeight: '220px'}}>
      <CardContent>
        <Box sx={{ height: '220px', mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10, right: 20, left: 10, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={colors.lineChartStroke} 
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{ r: 8 }}
                fill="url(#colorUv)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Box>
  );
};

export default CustomLineChart;