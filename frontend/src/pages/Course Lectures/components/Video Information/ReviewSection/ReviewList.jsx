import React from 'react';
import { Box, Typography } from '@mui/material';
import ReviewCard from './ReviewCard';

export default function ReviewList({ reviews, onDelete, onEdit }) {
  if (reviews.length === 0) {
    return <Typography color="text.secondary">No reviews yet.</Typography>;
  }

  return (
    <Box>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </Box>
  );
}
