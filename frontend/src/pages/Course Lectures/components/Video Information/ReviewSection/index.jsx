import React, { useState } from 'react';
import { Box, Typography, Divider, Button, Stack } from '@mui/material';
import ReviewList from './ReviewList';
import ReviewDialog from './ReviewDialog';


export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const handleAdd = (review) => {
    if (review.id) {
      setReviews(reviews.map(r => (r.id === review.id ? review : r)));
    } else {
      setReviews([{ ...review, id: Date.now() }, ...reviews]);
    }
    setOpen(false);
    setEditingReview(null);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setOpen(true);
  };

  return (
    <Box sx={{ margin: 'auto', mt: 5, p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Reviews</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Write a Review</Button>
      </Stack>

      <ReviewList
        reviews={reviews}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <ReviewDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingReview(null);
        }}
        onSave={handleAdd}
        initialData={editingReview}
      />
    </Box>
  );
  
}
