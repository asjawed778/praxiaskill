import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => (
  <>
    {["What is the duration?", "Do I get a certificate?"].map((q, i) => (
      <Accordion key={i}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{q}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Answer to the question goes here.</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </>
);
export default FAQ;
