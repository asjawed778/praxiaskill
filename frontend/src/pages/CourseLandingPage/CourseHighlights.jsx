import { Box, Grid, Paper, Typography, Container } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Science from '@mui/icons-material/Science';




const CourseHighlights = ({ course }) => {
  const highlights = [
  {
    icon: <AccessTimeIcon fontSize="large" sx={{ color: '#6366f1' }} />,
    title: 'Duration',
    subtitle: course?.duration,
  },
  {
    icon: <TrendingUpIcon fontSize="large" sx={{ color: '#10b981' }} />,
    title: 'Level',
    subtitle: course?.courseLevel,
  },
  {
    icon: <LaptopMacIcon fontSize="large" sx={{ color: '#f59e0b' }} />,
    title: 'Mode',
    subtitle: course?.courseMode,
  },
  {
    icon: <Science fontSize="large" sx={{ color: 'blue' }} />
    ,
    title: 'Method',
    subtitle: 'Project Based Learning',
  },
];
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#0f172a',
      }}
    >
      <Container >
        <Typography
          component="h2"
          textAlign="center"
          fontWeight="bold"
          color="white"
          sx={{
            mb: {xs: 4, md: 8},
            fontSize: { xs: "24px", sm: "36px", md: "44px" },
          }}
        >
          Course Highlights
        </Typography>

        <Grid container spacing={2}>
          {highlights?.map((item, index) => (
            <Grid size={{xs: 12, md: 3}} key={index}>
              <Paper
                elevation={2}
                sx={{
                  py: 2,
                  borderRadius: '20px',
                  backgroundColor: '#1e293b',
                  height: "150px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: `0 0 20px rgba(99, 102, 241, 0.5)`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    zIndex: -1,
                    borderRadius: '22px',
                    opacity: 0.3,
                  },
                }}
              >
                {item.icon}
                {/* <AccessTimeIcon /> */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    mt: { xs: 1, md: 1.5 },
                    mb: 0.5,
                    color: 'grey.400',
                    fontSize: '0.875rem',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                >
                  {item.subtitle}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseHighlights;
