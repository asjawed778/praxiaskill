import { Card, Typography, Box } from "@mui/material";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import { useAppTheme } from "@/context/ThemeContext";

const CourseCard = ({ course, onClick }) => {
  const {
    _id,
    title,
    thumbnail,
    instructor,
    type = "Professional Certificate",
    level = "Beginner to Advanced",
    tags = [],
    totalRatings = 0,
    reviews = 0,
    duration = "",
  } = course;

  const { colors } = useAppTheme();
  const renderStars = (average) => {
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <Box display="flex" alignItems="center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            sx={{ color: colors.primary, fontSize: 15 }}
          />
        ))}
        {hasHalfStar && (
          <StarHalf sx={{ color: colors.primary, fontSize: 15 }} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarBorder
            key={`empty-${i}`}
            sx={{ color: colors.primary, fontSize: 15 }}
          />
        ))}
      </Box>
    );
  };

  const averageRating = reviews ? totalRatings / reviews : 4.5;

  return (
    <Card
      onClick={() => onClick(_id, title)}
      sx={{
        cursor: "pointer",
        width: {xs: 350, md: 280},

        height: 380,
        p: {xs: 1, md: 0.5},
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          height: {xs: 170, md: 140},
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 3,
        }}
      >
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, p: 1 }}>
        <Typography
        variant="subtitle1"
        fontWeight="bold"
          gutterBottom
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>

        {/* <Typography variant="body2" color="text.secondary" noWrap>
          {instructor?.name}
        </Typography> */}
        <Typography variant="caption" display="block" color="text.secondary">
          {type} • {level}
        </Typography>

        <Typography
          variant="body2"
          mt={1}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <strong>Skills:</strong> {tags.join(", ")}
        </Typography>

        <Box mt={2}>
          {/* <Typography variant="body2">
            {renderStars(averageRating)} ({averageRating.toFixed(1)})
          </Typography> */}

          <Typography variant="caption" color="text.secondary" mt={2}>
            {level} • {type} • {duration}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CourseCard;
