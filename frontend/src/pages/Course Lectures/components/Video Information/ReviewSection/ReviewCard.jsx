import React from 'react';
import {
  Card, CardContent, Typography, Stack, Rating, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ReviewCard({ review, onDelete, onEdit }) {
  return (
    <Card  sx={{ mb: 2, width: "100%" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography variant="subtitle1">{review.name}</Typography>
            <Rating value={review.rating} readOnly />
          </Stack>
          <Stack direction="row">
            <IconButton color="secondary" onClick={() => onEdit(review)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(review.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant="body2" mt={1}>
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}
