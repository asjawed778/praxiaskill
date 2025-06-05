// import { Box, Typography, Avatar, Paper, Button, styled } from "@mui/material";
// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// const TestimonialCard = styled(Paper)(({ theme }) => ({
//   minWidth: 300,
//   maxWidth: 300,
//   height: 230,
//   display: "flex",
//   flexDirection: "column",
//   marginRight: theme.spacing(3),
//   backgroundColor: "#1e1e1e",
//   color: "#fff",
//   padding: theme.spacing(2),
//   borderRadius: 16,
//   flexShrink: 0,
//   overflow: "hidden",
// }));

// const MAX_LENGTH = 100;

// const TruncatedComment = ({ text }) => {
//   const [showFull, setShowFull] = useState(false);
//   const shouldTruncate = text.length > MAX_LENGTH;

//   const toggle = (e) => {
//     e.stopPropagation();
//     setShowFull((prev) => !prev);
//   };

//   return (
//     <Typography sx={{ fontSize: "15px", color: "#ddd" }}>
//       {showFull || !shouldTruncate
//         ? `“${text}”`
//         : `“${text.slice(0, MAX_LENGTH)}...”`}
//       {shouldTruncate && (
//         <span
//           onClick={toggle}
//           style={{
//             color: "#90caf9",
//             cursor: "pointer",
//             marginLeft: 4,
//             fontSize: "13px",
//           }}
//         >
//           {showFull ? "Show Less" : "Read More"}
//         </span>
//       )}
//     </Typography>
//   );
// };

// export default function Testimonials({ course }) {
//   if (!course?.testimonials || course.testimonials.length === 0) return null;

//   const topTestimonials = course.testimonials.map((testimonial) => ({
//     name: testimonial.userId.name,
//     profilePic: testimonial.userId.profilePic,
//     comment: testimonial.comment,
//   }));

//   const extendedTestimonials = [...topTestimonials, ...topTestimonials];

//   const [isPaused, setIsPaused] = useState(false);
//   const isTouchDevice =
//     typeof window !== "undefined" && "ontouchstart" in window;

//   const containerRef = useRef(null);
//   const scrollWidth = useRef(0);

//   useEffect(() => {
//     if (containerRef.current) {
//       scrollWidth.current = containerRef.current.scrollWidth / 2;
//     }
//   }, []);

//   return (
//     <Box
//       sx={{
//         bgcolor: "#000",
//         color: "#fff",
//         px: 3,
//         py: 4,
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         align="center"
//         gutterBottom
//         sx={{
//           fontSize: {
//             xs: "24px",
//             sm: "36px",
//             md: "44px",
//           },
//         }}
//       >
//         What Our Learners Say
//       </Typography>

//       <Box
//         component={motion.div}
//         ref={containerRef}
//         onMouseEnter={!isTouchDevice ? () => setIsPaused(true) : undefined}
//         onMouseLeave={!isTouchDevice ? () => setIsPaused(false) : undefined}
//         animate={{
//           x: isPaused ? undefined : [0, -scrollWidth.current],
//         }}
//         transition={{
//           x: {
//             duration: 20,
//             ease: "linear",
//             repeat: Infinity,
//           },
//         }}
//         sx={{
//           display: "flex",
//           width: "fit-content",
//           mt: 4,
//         }}
//       >
//         {extendedTestimonials.map((t, idx) => (
//           <TestimonialCard key={idx} elevation={6}>
//             <Avatar src={t.profilePic} alt={t.name} sx={{ mb: 1 }} />
//             <Typography variant="h6">{t.name}</Typography>
//             <Box sx={{ overflowY: "auto", maxHeight: 100, mt: 1 }}>
//               <TruncatedComment text={t.comment} />
//             </Box>
//           </TestimonialCard>
//         ))}
//       </Box>
//     </Box>
//   );
// }

import { Box, Typography, Avatar, Paper, styled } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TestimonialCard = styled(Paper)(({ theme }) => ({
  minWidth: 300,
  maxWidth: 300,
  height: {xs: 150, sm: 200},
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
        variant="h1"
        align="center"
        
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
              <Avatar src={t.profilePic} alt={t.name} sx={{ width: {xs: 24, sm: 30}, height: {xs: 24, sm: 30 }}} />

              <Typography variant="body1" fontWeight="bold">
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
