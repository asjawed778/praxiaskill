import { Box } from "@mui/material";
import Hero from "./Hero";
import ProgramHighlights from "./ProgramHighlight";
import ToolsGrid from "./ToolsGrid";
import WhyDigitalMarketing from "./WhyDigitalMarketing";
import RoadmapSection from "./RoadmapSection";
import FAQSection from "./FAQSection";
import MentorsSection from "./MentorsSection";

const LandingPage = () => {
  return (
    <Box sx={{bgcolor: "#000000"}}>
      <Hero />
      <ProgramHighlights />
      <ToolsGrid />
      <WhyDigitalMarketing />
      <RoadmapSection />
      <MentorsSection />
      <FAQSection />    
    </Box>
  );
};
export default LandingPage;
