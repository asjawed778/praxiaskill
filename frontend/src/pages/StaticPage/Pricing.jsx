import { Box, Typography, Button } from '@mui/material';

const Pricing = () => (
  <Box textAlign="center" py={5}>
    <Typography variant="h4" fontWeight={700}>Special Offer: ₹9999</Typography>
    <Typography variant="body1" color="text.secondary">Limited-time price for early applicants</Typography>
    <Button variant="contained" color="primary" sx={{ mt: 2 }}>Apply Now</Button>
  </Box>
);
export default Pricing;
