import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Chip,
  Stack,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PricingSection = () => {
  const plans = [
    {
      title: 'RED Course Features',
      price: 4500,
      original: 9000,
      discount: '50% OFF',
      features: ['One Stop Solution', 'Exclusive Community'],
    },
    {
      title: 'RED Premium',
      price: 4100,
      original: 9000,
      discount: '55% OFF',
      features: ['No Pre-requisite Required'],
      tag: 'Early bird offer',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#111827', color: 'white', py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight="bold">
            One Plan. All Features. No Compromises.
          </Typography>
          <Typography variant="subtitle1" color="gray">
            Everything you need to master Data Structures and Algorithms and ace your coding interviews.
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={4}>
          {plans.map((plan, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  backgroundColor: '#1f2937',
                  color: 'white',
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="error" fontWeight="bold">
                  {plan.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                  <Typography variant="h4" fontWeight="bold">₹{plan.price}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: 'line-through', opacity: 0.7 }}
                  >
                    ₹{plan.original}
                  </Typography>
                  <Chip
                    label={plan.discount}
                    size="small"
                    sx={{
                      backgroundColor: '#b91c1c',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Stack>

                {plan.tag && (
                  <Chip
                    label={plan.tag}
                    variant="outlined"
                    size="small"
                    sx={{
                      mt: 1,
                      color: 'white',
                      borderColor: 'gray',
                    }}
                  />
                )}

                {/* Features */}
                <Box mt={3}>
                  {plan.features.map((feature, i) => (
                    <Stack direction="row" spacing={1} alignItems="center" key={i} mb={1}>
                      <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                      <Typography variant="body2">{feature}</Typography>
                    </Stack>
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingSection;


// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// const pricingPlans = [
//   {
//     title: "Full Access",
//     price: "₹999",
//     features: [
//       "All Course Videos",
//       "Downloadable Resources",
//       "Doubt Clearing Support",
//       "Certificate of Completion",
//       "Lifetime Access",
//     ],
//     buttonText: "Pay & Enroll",
//   },
// ];

// const PricingSection = () => {
//   return (
//     <Box
//       sx={{
//         background: "#000",
//         py: 10,
//         px: 3,
//         color: "#fff",
//         textAlign: "center",
//       }}
//     >
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         Unlock the Full Course
//       </Typography>
//       <Typography variant="subtitle1" color="gray" mb={6}>
//         One-time payment. Lifetime access.
//       </Typography>

//       <Grid container spacing={4} justifyContent="center">
//         {pricingPlans.map((plan, i) => (
//           <Grid item xs={12} sm={8} md={5} key={i}>
//             <Card
//               sx={{
//                 background:
//                   "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
//                 border: "1px solid rgba(255,255,255,0.2)",
//                 borderRadius: 4,
//                 backdropFilter: "blur(10px)",
//                 color: "#fff",
//                 boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: "0 6px 40px rgba(0,0,0,0.7)",
//                 },
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                   {plan.title}
//                 </Typography>
//                 <Typography
//                   variant="h3"
//                   sx={{ color: "#00e5ff", fontWeight: "bold" }}
//                   gutterBottom
//                 >
//                   {plan.price}
//                 </Typography>
//                 <List>
//                   {plan.features.map((feature, index) => (
//                     <ListItem key={index}>
//                       <ListItemIcon>
//                         <CheckCircleIcon sx={{ color: "#00e676" }} />
//                       </ListItemIcon>
//                       <ListItemText primary={feature} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </CardContent>
//               <CardActions sx={{ justifyContent: "center", pb: 2 }}>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     background: "#00e5ff",
//                     color: "#000",
//                     fontWeight: "bold",
//                     borderRadius: "30px",
//                     px: 4,
//                     py: 1.5,
//                     transition: "0.3s",
//                     "&:hover": {
//                       background: "#00bcd4",
//                     },
//                   }}
//                 >
//                   {plan.buttonText}
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default PricingSection;
