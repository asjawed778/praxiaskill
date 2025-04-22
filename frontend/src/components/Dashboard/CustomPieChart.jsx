import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

const CustomPieChart = (props) => {
  const {
    data,
    dataKey = 'value',
    nameKey = 'name',
    colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#6C8EBF'],
    width = '100%',
    height = '220px',
    innerRadius = 0,
    outerRadius = '80%',
    showLabel = true,
    showLegend = true,
    labelFormatter,
    tooltipFormatter,
    legendFormatter,
    containerStyle = {},
  } = props;

  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    if (!showLabel) return null;
    if (labelFormatter) {
      return labelFormatter(props);
    }
    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Box sx={{ 
        height, 
        width, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        ...containerStyle
      }}>
        No data available
      </Box>
    );
  }

  return (
    <Box sx={{ height: '220px', }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || colors[index % colors.length]} 
              />
            ))}
          </Pie>
          
          <Tooltip 
            formatter={tooltipFormatter || ((value, name) => [`${value}`, name])} 
          />
          
          {showLegend && (
            <Legend 
              formatter={legendFormatter || ((value) => value)}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CustomPieChart;


