import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

/**
 * Generic Pie Chart component that can be used anywhere in your application
 * 
 * @param {Object} props - Component props
 */
const GenericPieChart = (props) => {
  const {
    data,
    dataKey = 'value',
    nameKey = 'name',
    colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#6C8EBF'],
    width = '100%',
    height = 300,
    innerRadius = 0,
    outerRadius = '80%',
    showLabel = true,
    showLegend = true,
    labelFormatter,
    tooltipFormatter,
    legendFormatter,
    containerStyle = {},
  } = props;

  // Default label rendering function
  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    if (!showLabel) return null;

    // Use custom formatter if provided
    if (labelFormatter) {
      return labelFormatter(props);
    }

    // Only display label if segment is big enough
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

  // Handle empty or invalid data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ 
        height, 
        width, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        ...containerStyle
      }}>
        No data available
      </div>
    );
  }

  return (
    <div style={{ width, height, ...containerStyle }}>
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
    </div>
  );
};

// PropTypes for component documentation and validation
GenericPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  outerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showLabel: PropTypes.bool,
  showLegend: PropTypes.bool,
  labelFormatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  legendFormatter: PropTypes.func,
  containerStyle: PropTypes.object,
};

export default GenericPieChart;