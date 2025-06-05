import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Rating, Stack
} from '@mui/material';
import { useRateCourseMutation } from '../../../../../services/course.api';
import { toast } from 'react-hot-toast';

export default function ReviewDialog({ open, onClose, onSave, initialData, courseId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [rateCourse, { isLoading }] = useRateCourseMutation();

  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating);
      setComment(initialData.comment);
    } else {
      setRating(0);
      setComment('');
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!comment || rating === 0) return;
    const review = {
      id: initialData?.id || null,
      rating,
      comment,
    };
    try {
      const result = await rateCourse({ courseId, data: { rating, comment } }).unwrap();
      console.log("Review submitted:", result);
      onClose();
      onSave(result.data);
      setRating(0);
      setComment('');
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Review' : 'Write a Review'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
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
