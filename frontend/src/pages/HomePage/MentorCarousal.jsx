import { useRef, useEffect, useState } from "react";
import {
  Box,
  CardContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Container,
} from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  LinkedIn,
} from "@mui/icons-material";
import { mentors } from "../../../data";

const MentorCarousel = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const [mentorList, setMentorList] = useState([...mentors]);
  const [isScrollable, setIsScrollable] = useState(false);

  const scroll = (direction = "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = isSmall ? 270 : 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Check if horizontal scroll is required
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const checkScrollability = () => {
      const scrollable = container.scrollWidth > container.clientWidth + 5;
      setIsScrollable(scrollable);
    };

    checkScrollability();

    const resizeObserver = new ResizeObserver(checkScrollability);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [mentorList]);

  // Auto scroll when scrollable
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isScrollable) return;

    const scrollAmount = isSmall ? 270 : 300;

    intervalRef.current = setInterval(() => {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (scrollLeft + scrollAmount >= maxScrollLeft - 2) {
        setMentorList((prev) => [...prev, ...mentors]);
      }

      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [isSmall, isScrollable, mentorList]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ borderRadius: 2, py: 2, mt: { xs: 4, md: 6, xl: 8 } }}>
        <Box sx={{ textAlign: "center", mb: 4, position: "relative", zIndex: 1 }}>
          <Typography
            sx={{
              fontSize: {
                xs: "24px",
                sm: "28px",
                md: "32px",
                lg: "36px",
                xl: "40px",
              },
              fontWeight: 600,
            }}
          >
            Your Growth is Backed by Trusted Industry Professionals.
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "14px",
                sm: "16px",
                md: "18px",
                lg: "20px",
                xl: "22px",
              },
              color: "text.secondary",
            }}
          >
            Our Instructors Work Where You Want to Be — And They'll Show You How to Get There
          </Typography>
        </Box>

        <Box sx={{ position: "relative", px: 2 }}>
          {isScrollable && !isSmall && (
            <>
              <IconButton
                onClick={() => scroll("left")}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  backgroundColor: "#101828",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1a2438",
                    transform: "translateY(-50%) scale(1.05)",
                  },
                }}
              >
                <ArrowBackIosNew />
              </IconButton>
              <IconButton
                onClick={() => scroll("right")}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  backgroundColor: "#101828",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1a2438",
                    transform: "translateY(-50%) scale(1.05)",
                  },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </>
          )}

          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              gap: 2,
              justifyContent: mentorList.length < 4 ? "center" : "flex-start",
              px: isSmall ? 1 : 2,
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {mentorList.map((mentor, index) => (
              <Box
                key={`${mentor.name}-${index}`}
                sx={{
                  bgcolor: "#F9FAFB",
                  minWidth: { xs: "220px", sm: "260px", md: "260px" },
                  maxWidth: { xs: "220px", sm: "260px", md: "260px" },
                  maxHeight: "340px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: "0 0 auto",
                  scrollSnapAlign: "start",
                }}
              >
                <Box display="flex" justifyContent="center" mt={2}>
                  <Avatar
                    src={mentor.image}
                    alt={mentor.name}
                    sx={{
                      width: { xs: "60px", sm: "80px" },
                      height: { xs: "60px", sm: "80px" },
                    }}
                  />
                </Box>

                <Box display="flex" justifyContent="center">
                  <CardContent sx={{ textAlign: "center", maxWidth: "228px" }}>
                    <Typography sx={{ fontSize: { xs: "16px", sm: "18px" } }}>
                      {mentor.name}
                    </Typography>
                    <Typography fontSize="14px" color="#22B286">
                      {mentor.designation}
                    </Typography>
                  </CardContent>
                </Box>

                <Box mt="auto" display="flex" justifyContent="center" pb={2}>
                  <IconButton
                    component="a"
                    href={mentor.linkedin?.trim() || "#"}
                    target={mentor.linkedin?.trim() ? "_blank" : undefined}
                    rel={
                      mentor.linkedin?.trim()
                        ? "noopener noreferrer"
                        : undefined
                    }
                    sx={{ color: "#98A2B3" }}
                  >
                    <LinkedIn />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default MentorCarousel;

