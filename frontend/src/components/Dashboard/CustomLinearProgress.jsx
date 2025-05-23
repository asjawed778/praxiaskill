import React from 'react';
import { CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { useAppTheme } from '../../context/ThemeContext';

const CustomLinearProgress = ({ data }) => {
  const { colors } = useAppTheme();
  return (
    <Box sx={{ height: '220px'  }}>
      <CardContent>
        <Box sx={{ mt: 1 }}>
          {data.map((course, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
              >
                {course.name}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={course.popularity}
                sx={{
                  flex: 1,
                  height: 15,
                  borderRadius: 5,
                  backgroundColor: '#EDF2F7',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: colors.lineProgressBackground,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Box>
  );
};

export default CustomLinearProgress;
