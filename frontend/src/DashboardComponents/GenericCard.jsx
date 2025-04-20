import { Box, Card, CardContent, Typography } from "@mui/material";

const GenericCard = ({ icon, value, label, color }) => {
    return (
        <Card
        sx={{
          height: '100%',
          width: '100%',
          borderRadius: 2,
          backgroundColor: `${color}.50`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          },
        }}
      >      
        <CardContent sx={{ padding: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 1.5,
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-start', 
              alignItems: 'center',
              width: 40,
            height: 40 
            }}>
              <Box 
                sx={{ 
                  backgroundColor: `${color}.100`, 
                  borderRadius: 1.5,
                  padding: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40
                }}
              >
                {icon}
              </Box>
            </Box>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };
  export default GenericCard;