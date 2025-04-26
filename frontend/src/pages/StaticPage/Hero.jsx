// import React from 'react';
// import { Box, Typography, Button, Grid, Container } from '@mui/material';

// const Hero = () => {
//   return (
//     <Box
//       sx={{
//         background: 'linear-gradient(135deg, #FF6D00 0%, #FF9E00 100%)',
//         color: 'white',
//         py: 8,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
//               Master Digital Marketing
//             </Typography>
//             <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
//               Learn from industry experts and boost your career
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <Button variant="contained" color="secondary" size="large">
//                 Enroll Now
//               </Button>
//               <Button variant="outlined" color="inherit" size="large">
//                 Watch Demo
//               </Button>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Box
//               component="img"
//               src="https://course.growthschool.io/_next/image?url=%2Fimages%2Fdigital-marketing-hero.png&w=1200&q=75"
//               alt="Digital Marketing Course"
//               sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Hero;

import React from 'react';
import { Box, Typography, Button, Grid, Chip, Container } from '@mui/material';
import { PlayCircleFilled } from '@mui/icons-material';

const Hero = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #3A1C71 30%, #D76D77 50%, #FFAF7B 100%)',
        color: 'white',
        py: 8,
        px: 2,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Become A Full-Stack AI-Powered Digital Marketer In Just 6 Months
        </Typography>
        
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
        >
          Master all digital marketing essentials while learning practical AI tools that amplify your campaign success
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <Chip label="ONLINE" color="primary" />
          <Chip label="27TH APRIL, 2025" color="primary" />
          <Chip label="6 MONTHS" color="primary" />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ px: 4, py: 2, fontWeight: 'bold' }}
          >
            Enroll Now
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            startIcon={<PlayCircleFilled />}
            sx={{ px: 4, py: 2, fontWeight: 'bold' }}
          >
            Watch Demo
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;