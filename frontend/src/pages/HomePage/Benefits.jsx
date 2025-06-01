import { Box, Typography, Grid, Card, CardContent, Avatar, Container, useTheme } from '@mui/material';
import {
  SchoolOutlined,
  BuildOutlined,
  SupportOutlined,
  ScheduleOutlined
} from '@mui/icons-material';

const Benefits = () => {
  const theme = useTheme();
  
  const benefits = [
    {
      icon: <SchoolOutlined fontSize="medium" />,
      title: "Expert Faculty from MAANG",
      description: "Top-tier education enriched by practical knowledge and innovation",
      color: theme.palette.primary.main
    },
    {
      icon: <BuildOutlined fontSize="medium" />,
      title: "Projects & Mentors",
      description: "Hands-on learning to spark creative problem-solving",
      color: theme.palette.secondary.main
    },
    {
      icon: <SupportOutlined fontSize="medium" />,
      title: "Fastest Doubt Support",
      description: "Personalized assistance for a clear understanding of concepts",
      color: theme.palette.success.main
    },
    {
      icon: <ScheduleOutlined fontSize="medium" />,
      title: "Self-Paced Learning",
      description: "Learn at your pace with practice and instant feedback",
      color: theme.palette.warning.main
    }
  ];

  return (
    <Box 
      sx={{ 
        py: 4,
        my:2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.08) 0%, transparent 50%)',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center',
            mb: 6,
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography  
            sx={{ 
              fontWeight: 700,
              mb: 2,
              fontSize: '24px'
            }}
          >
            How Praxia Skill help you?
          </Typography>
          <Typography  
            sx={{ 
              fontWeight: 400,
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Connects theoretical understanding with practical implementation through expert insights.
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
          {benefits.map((benefit, index) => (
            <Grid size={{xs:12, sm: 6, md: 3}} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`
                  },
                  borderRadius: '12px',
                  borderBottom: `4px solid ${benefit.color}`,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: `${benefit.color}20`,
                      color: benefit.color,
                      width: 36,
                      height: 36,
                      mb: 2
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography 
                    sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      fontSize: "16px"
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                      fontSize: "14px"
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Benefits;