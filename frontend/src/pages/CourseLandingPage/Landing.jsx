import {
  Box,
  Container,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import ModalWrapper from "@/components/ModalWrapper";
import { useSelector } from "react-redux";
import EnquiryForm from "./EnquiryForm";
import HeroSection from "./HeroSection";
import ProgramHighlights from "./ProgramHighlights";
import ToolsGrid from "./ToolsGrid";
import CourseSyllabus from "./CourseSyllabus";
import Testimonials from "./Testimonials";
import CourseHighlights from "./CourseHighlights";
import FAQSections from "./FAQSections";
import { WhatsApp } from "@mui/icons-material";

const Landing = ({ course }) => {
  const syllabusRef = useRef(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingBtn(scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [openEnquiry, setOpenEnquiry] = useState(false);
  const handleOpen = () => setOpenEnquiry(true);
  const handleClose = () => setOpenEnquiry(false);

  const phoneNumber = "919123735554"; 
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Box sx={{ bgcolor: "black", color: "white", position: "relative" }}>
      <HeroSection syllabusRef={syllabusRef} course={course} />
      <CourseHighlights course={course} />
      <ProgramHighlights course={course} />
      <ToolsGrid course={course} />
      <div ref={syllabusRef}>
        <CourseSyllabus course={course} />
      </div>
      <FAQSections course={course} />
      <Testimonials course={course} />
      {/* WhatsApp Floating Button */}
      <Zoom in={true}>
        <Box
          sx={{
            position: "fixed",
            bottom: showFloatingBtn ? { xs: 70, sm: 80, md: 90 } : 24,
            right: { xs: 20, md: 24 },
            zIndex: 1300,
            transition: "bottom 0.4s ease-in-out",
          }}
        >
          <IconButton
            onClick={handleClick}
            sx={{
              width: { xs: 32, sm: 36, md: 40 },
              height: { xs: 32, sm: 36, md: 40 },
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              boxShadow: "0 8px 30px rgba(37, 211, 102, 0.4)",
              color: "#fff",
              animation: "pulseGreen 2s infinite ease-in-out",
              "@keyframes pulseGreen": {
                "0%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.5)" },
                "70%": { boxShadow: "0 0 0 15px rgba(37, 211, 102, 0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0)" },
              },
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.3s ease-in-out",
                background: "linear-gradient(135deg, #128C7E, #075E54)",
              },
            }}
          >
            <WhatsApp fontSize="medium" />
          </IconButton>
        </Box>
      </Zoom>

      {/* Enquire Now Button */}
      <Zoom in={showFloatingBtn}>
        <Box
          sx={{
            position: "fixed",
            bottom: { xs: 20, md: 24 },
            right: { xs: 20, md: 24 },
            zIndex: 1300,
          }}
        >
          <CustomButton
            label="Enquire Now"
            variant="contained"
            size="small"
            onClick={handleOpen}
            sx={{
              px: { xs: 1.5, sm: 2, xl: 2.5 },
              py: { xs: 0.8, sm: 1, xl: 1.25 },
              // fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              boxShadow: "0 8px 30px rgba(239, 68, 68, 0.4)",
              textTransform: "none",
              animation: "pulseRed 2s infinite ease-in-out",
              "@keyframes pulseRed": {
                "0%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.5)" },
                "70%": { boxShadow: "0 0 0 15px rgba(239, 68, 68, 0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0)" },
              },
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          />
        </Box>
      </Zoom>

      <ModalWrapper open={openEnquiry} onClose={handleClose} >
        <EnquiryForm onClose={handleClose} />
      </ModalWrapper>
    </Box>
  );
};
export default Landing;
