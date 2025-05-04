import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Rating, Stack
} from '@mui/material';

export default function ReviewDialog({ open, onClose, onSave, initialData }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setRating(initialData.rating);
      setComment(initialData.comment);
    } else {
      setName('');
      setRating(0);
      setComment('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!name || !comment || rating === 0) return;
    const review = {
      id: initialData?.id || null,
      name,
      rating,
      comment,
    };
    onSave(review);
    setName('');
  setRating(0);
  setComment('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Review' : 'Write a Review'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
