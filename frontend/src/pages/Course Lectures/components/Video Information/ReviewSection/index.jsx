import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Paper,
  CircularProgress,
  Chip
} from '@mui/material';
import { Star, TrendingUp, TrendingDown } from '@mui/icons-material';
import ReviewList from './ReviewList';
import ReviewDialog from './ReviewDialog';
import { useParams } from 'react-router-dom';
import { useGetCourseRatingsQuery } from '../../../../../services/course.api';

export default function ReviewSection() {
  const courseId = useParams().courseId;
  const [open, setOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [sort, setSort] = useState('latest'); // latest, oldest
  const [allReviews, setAllReviews] = useState([]);

  const { data, isLoading, isFetching } = useGetCourseRatingsQuery({
    courseId,
    pageNo: pageNo,
    limit: 10,
    sort: sort
  });

const handleAdd = (review) => {
  if (review._id) {
    setAllReviews(allReviews.map(r =>
      r._id === review._id
        ? { ...r, comment: review.comment, rating: review.rating, updatedAt: new Date().toISOString() }
        : r
    ));
  } else {
    setAllReviews([{ ...review, _id: Date.now(), createdAt: new Date().toISOString() }, ...allReviews]);
  }
  setOpen(false);
  setEditingReview(null);
};


  const handleDelete = (id) => {
    setAllReviews(allReviews.filter(r => r._id !== id));
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setOpen(true);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPageNo(1);
    setAllReviews([]);
  };

  const handleLoadMore = () => {
    if (data && pageNo < data.totalPages) {
      setPageNo(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (data) {
      if (pageNo === 1) {
        setAllReviews(data.data.ratings);
      } else {
        setAllReviews(prev => [...prev, ...data.data.ratings]);
      }
      // console.log("Fetched reviews:", data);
    }
  }, [data, pageNo]);

  if (isLoading && pageNo === 1) {
    return (
      <Box sx={{ margin: 'auto', mt: 5, p: 2, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading reviews...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 'auto', mt: 5, p: 2 }}>
      {data && (
        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa' }}>
          <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Star sx={{ color: '#ffc107', fontSize: 32 }} />
              <Typography variant="h4" fontWeight="bold">
                {data.data.averageRating?.toFixed(1) || '0.0'}
              </Typography>
            </Stack>

            <Stack>
              <Rating
                value={data.data.averageRating || 0}
                readOnly
                precision={0.1}
                size="large"
              />
              <Typography variant="body2" color="text.secondary">
                Based on {data.data.totalRatings} review{data.data.totalRatings !== 1 ? 's' : ''}
              </Typography>
            </Stack>

            <Chip
              label={`${data.data.totalRatings} Total Reviews`}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </Paper>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5">Reviews</Typography>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sort}
              label="Sort by"
              onChange={handleSortChange}
            >
              <MenuItem value="latest">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingUp fontSize="small" />
                  <span>Latest</span>
                </Stack>
              </MenuItem>
              <MenuItem value="oldest">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingDown fontSize="small" />
                  <span>Oldest</span>
                </Stack>
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {data && !data.data.isRated && (
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}
          >
            Write a Review
          </Button>
        )}
      </Stack>

      <Divider sx={{ mb: 3 }} />
      <ReviewList
        reviews={allReviews || []}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {data && pageNo < data.totalPages && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            disabled={isFetching}
            startIcon={isFetching ? <CircularProgress size={20} /> : null}
            sx={{ minWidth: 120 }}
          >
            {isFetching ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}

      {data && pageNo >= data.totalPages && allReviews.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            You've reached the end of reviews
          </Typography>
        </Box>
      )}

      {allReviews.length === 0 && !isLoading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No reviews yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Be the first to share your experience with this course!
          </Typography>
        </Box>
      )}
      <ReviewDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingReview(null);
        }}
        onSave={handleAdd}
        initialData={editingReview}
        courseId={courseId}
      />
    </Box>
  );
}