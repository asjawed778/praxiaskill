import { Box, Typography, Avatar, Paper, styled } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TestimonialCard = styled(Paper)(({ theme }) => ({
  minWidth: 300,
  maxWidth: 300,
  height: { xs: 150, sm: 200 },
  display: "flex",
  flexDirection: "column",
  marginRight: theme.spacing(3),
  backgroundColor: "#1e1e1e",
  color: "#fff",
  padding: theme.spacing(2),
  borderRadius: 16,
  flexShrink: 0,
  overflow: "hidden",
}));

const CommentText = styled(Typography)({
  // fontSize: {xs: "12px", },
  color: "#ccc",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  textOverflow: "ellipsis",
});

export default function Testimonials({ course }) {
  if (!course?.testimonials || course.testimonials.length === 0) return null;

  const topTestimonials = course.testimonials.map((testimonial) => ({
    name: testimonial.userId.name,
    profilePic: testimonial.userId.profilePic,
    comment: testimonial.comment,
  }));

  const extendedTestimonials = [...topTestimonials, ...topTestimonials];

  const [isPaused, setIsPaused] = useState(false);
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const containerRef = useRef(null);
  const scrollWidth = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      scrollWidth.current = containerRef.current.scrollWidth / 2;
    }
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#000",
        color: "#fff",
        px: 3,
        py: 4,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Typography
        component="h2"
        sx={{
          color: "white",
          fontWeight: 600,
          fontSize: {
            xs: "32px",
            sm: "36px",
            md: "40px",
            lg: "44px",
            xl: "48px",
          },
          textAlign: "center",
        }}
      >
        What Our Learners Say
      </Typography>

      <Box
        component={motion.div}
        ref={containerRef}
        onMouseEnter={!isTouchDevice ? () => setIsPaused(true) : undefined}
        onMouseLeave={!isTouchDevice ? () => setIsPaused(false) : undefined}
        animate={{
          x: isPaused ? undefined : [0, -scrollWidth.current],
        }}
        transition={{
          x: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          },
        }}
        sx={{
          display: "flex",
          width: "fit-content",
          mt: 4,
        }}
      >
        {extendedTestimonials.map((t, idx) => (
          <TestimonialCard key={idx} elevation={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Avatar
                src={t.profilePic}
                alt={t.name}
                sx={{ width: { xs: 24, sm: 30 }, height: { xs: 24, sm: 30 } }}
              />

              <Typography
                sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "16px",
                    md: "18px",
                    lg: "20px",
                    xl: "22px",
                  },
                }}
              >
                {t.name}
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <CommentText variant="body2">“{t.comment}”</CommentText>
            </Box>
          </TestimonialCard>
        ))}
      </Box>
    </Box>
  );
}
