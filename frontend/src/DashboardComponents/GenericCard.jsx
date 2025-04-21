import { Box, Card, CardContent, Typography } from "@mui/material";
import {useAppTheme} from "../context/ThemeContext"

const GenericCard = ({ cards = [] }) => {
  if (!Array.isArray(cards)) return null;
  const { colors } = useAppTheme();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        // justifyContent: cards.length <= 2 ? 'center' : 'flex-start',
        justifyContent: "center",
        gap: 1.5,
        gridTemplateColumns: {
          xs: 'repeat(auto-fit, minmax(140px, 1fr))', // allows shrinking on small screens
          md: 'repeat(4, 1fr)',
        }
      }}
    >
      {cards.length === 0 ? (
        <Typography variant="h6" textAlign="center" width="100%">
          No cards available
        </Typography>
      ) : (
        cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              display: 'grid',
              justifyContent: "center",
              borderRadius: 4,
              backgroundColor: colors.cardBackgroundColor,
              color: colors.cardText,
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {card.value}
              </Typography>
              <Typography variant="body2" >
                {card.label}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default GenericCard;
