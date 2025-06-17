import { Card, Typography, Box } from "@mui/material";
// import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import CustomButton from "@/components/CustomButton";
import { CourseMode } from "../../utils/enum";

const displayCourseMode = (mode) => {
  if(mode === CourseMode.HYBRID) return "Classroom + Live Online"
  if(mode === CourseMode.ONLINE) return "Live + Recorded"
  if(mode == CourseMode.OFFLINE) return "Classroom + Recorded"
}

const CourseCard = ({ 
  course, 
  onClick, 
  // height = 380,
  // width = 280
}) => {
  const {
    _id,
    title,
    subtitle,
    thumbnail,
    type = "Professional Certificate",
    level = "Beginner to Advanced",
    tags = [],
    totalRatings = 0,
    reviews = 0,
    courseMode,
    duration,
  } = course;
  console.log("course: ", course);
  // const renderStars = (average) => {
  //   const fullStars = Math.floor(average);
  //   const hasHalfStar = average % 1 >= 0.5;
  //   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  //   return (
  //     <Box display="flex" alignItems="center">
  //       {[...Array(fullStars)].map((_, i) => (
  //         <Star
  //           key={`full-${i}`}
  //           sx={{ color: colors.primary, fontSize: 15 }}
  //         />
  //       ))}
  //       {hasHalfStar && (
  //         <StarHalf sx={{ color: colors.primary, fontSize: 15 }} />
  //       )}
  //       {[...Array(emptyStars)].map((_, i) => (
  //         <StarBorder
  //           key={`empty-${i}`}
  //           sx={{ color: colors.primary, fontSize: 15 }}
  //         />
  //       ))}
  //     </Box>
  //   );
  // };

  // const averageRating = reviews ? totalRatings / reviews : 4.5;
  const category = course?.category?.name;
  return (
    <Card
      onClick={() => onClick(_id, title)}
      sx={{
        cursor: "pointer",
        width: {xs: 320, md: 280},
        height: 380,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 6,
        },
        borderRadius: 3,
      }}
    >
      {/* Image section */}
      <Box sx={{ 
        maxHeight: 173, 
        width: "100%", 
        overflow: "hidden" 
        }}>
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      {/* Content section */}
      <Box sx={{ flex: 1, p: 1, display: "flex", flexDirection: "column" }}>
        {/* Category */}
        <Box
          sx={{
            bgcolor: "#00FFB7",
            borderRadius: "5px",
            px: 1.5,
            py: "3px",
            alignSelf: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "12px", md: "13px" },
              color: "#667085",
              fontWeight: 700,
            }}
          >
            {category}
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: { xs: "14px", md: "15px" },
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.2,
            mt: 1.5,
            minHeight: "2.4em",
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: { 
              xs: "12px", 
              md: "13px",
              lg: "14px" 
            },
            color: "#667085",
            fontWeight: 600,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.4em",
            mt: 2,
          }}
        >
          {subtitle}
        </Typography>

        {/* Duration & Mode */}
        <Typography
          sx={{
            fontSize: { 
              xs: "12px", 
              md: "13px",
            },
            fontWeight: 600,
            mt: 1
          }}
        >Hightlights:</Typography>
        <Typography
          sx={{
            fontSize: { 
              xs: "10px", 
              md: "11px"
            },
            color: "#667085",
            textTransform: "none",
            fontWeight: 600
          }}
        >
          {duration} | {displayCourseMode(courseMode)}
        </Typography>

        {/* Button always at bottom */}
        <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
          <CustomButton
            label="Learn More"
            sx={{
              color: "#fff",
              bgcolor: "#101828",
              py: 0.5,
              px: 1.5,
              fontSize: "12px",
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default CourseCard;
