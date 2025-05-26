import { Box, Zoom } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import CustomButton from "@/components/CustomButton";
import ModalWrapper from "@/components/ModalWrapper";

import { useSelector } from "react-redux";
import EnquiryForm from "./EnquiryForm";
import HeroSection from "./HeroSection";
import ProgramHighlights from "./ProgramHighlights";
import ToolsGrid from "./ToolsGrid";
import CourseSyllabus from "./CourseSyllabus";
import ImageAccordian from "./ImageAccordian";
import Testimonials from "./Testimonials";
import CourseHighlights from "./CourseHighlights";

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

  return (
    <Box sx={{ bgcolor: "black", color: "white", position: "relative" }}>
      <HeroSection syllabusRef={syllabusRef} course={course} />
      <CourseHighlights course={course} />
      <ProgramHighlights course={course}/>
      <ToolsGrid course={course}/>
      {/* <PricingSection /> */}
      <div ref={syllabusRef}>
        <CourseSyllabus course={course} />
      </div>
      <ImageAccordian course={course}/>
      <Testimonials />
      {/* <FaqSection /> */}

      {/* Floating Enquiry Button */}
      <Zoom in={showFloatingBtn}>
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1300,
          }}
        >
          <CustomButton
            label="Enquiry Now"
            variant="contained"
            size="large"
            onClick={handleOpen}
            sx={{
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              boxShadow: "0 8px 30px rgba(239, 68, 68, 0.4)",
              textTransform: "none",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.5)" },
                "70%": { boxShadow: "0 0 0 15px rgba(239, 68, 68, 0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0)" },
              },
              "&:hover": {
                transform: "scale(1.05)",
                transition: "0.3s",
              },
            }}
          />
        </Box>
      </Zoom>
      <ModalWrapper open={openEnquiry} onClose={handleClose}>
        <EnquiryForm onClose={handleClose} />
      </ModalWrapper>
    </Box>
  );
};
export default Landing;

