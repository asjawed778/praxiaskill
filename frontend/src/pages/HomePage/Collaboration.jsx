import { Box, Typography, Avatar, Container } from "@mui/material";
import { keyframes } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { partners } from "../../../data";

const scroll = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const PartnerLogo = ({ name, logo }) => (
  <Box
    sx={{
      flex: "0 0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mx: 3,
    }}
  >
    <Avatar
      variant="rounded"
      src={logo}
      alt={`${name} logo`}
      sx={{
        width: 60,
        height: 60,
        bgcolor: "transparent",
        borderRadius: 2,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        mb: 1,
      }}
    />
    <Typography
      sx={{
        fontSize: {
          xs: "14px",
          sm: "16px",
          md: "18px",
        },
        textAlign: "center",
      }}
    >
      {name}
    </Typography>
  </Box>
);

const Collaboration = () => {
  const scrollRef = useRef(null);
  const wrapperRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const scrollWidth = scrollRef.current?.scrollWidth || 0;
    const wrapperWidth = wrapperRef.current?.offsetWidth || 0;
    setShouldScroll(scrollWidth > wrapperWidth);
  }, [partners]);

  return (
    <Box 
    sx={{
      mt: {xs: 2, md: 6, xl: 8},
      py: {xs: 2, md: 3, lg: 4}, 
      backgroundColor: "#f9fafc"
    }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          sx={{
            fontSize: {
              xs: "24px",
              sm: "28px",
              md: "32px",
              lg: "36px",
            },
            fontWeight: 600,
            mb: 4,
          }}
        >
          Backed by a strong placement support system offering access to 100+
          recruiting companies.
        </Typography>
        <Box
          ref={wrapperRef}
          sx={{
            overflow: "hidden",
            position: "relative",
            width: "100%",
          }}
        >
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              whiteSpace: "nowrap",
              width: "max-content",
              animation: shouldScroll
                ? `${scroll} 15s linear infinite`
                : "none",
              justifyContent: shouldScroll ? "initial" : "center",
              mx: shouldScroll ? 0 : "auto", // center the container itself if needed
              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {partners.map((partner, index) => (
              <PartnerLogo
                key={index}
                name={partner.name}
                logo={partner.logo}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Collaboration;



