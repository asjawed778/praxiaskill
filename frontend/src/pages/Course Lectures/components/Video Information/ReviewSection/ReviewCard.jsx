import React, { useEffect, useState } from 'react';
import {
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Rating, 
  IconButton,
  Avatar,
  Box,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

export default function ReviewCard({ review, onDelete, onEdit }) {
  const user = useSelector((state) => state.auth.user);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    console.log("User in ReviewCard:", user._id);
    console.log("ReviewCard mounted with review:", review);
  }, []);

  const isOwner = user && review.userId && (user._id === review.userId._id);
  
  const isLongComment = review.comment && review.comment.length > 200;
  const displayComment = isLongComment && !isExpanded 
    ? review.comment.substring(0, 120) + '...' 
    : review.comment;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card sx={{ mb: 2, width: "100%" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
            <Avatar 
              src={review.userId?.profilePic} 
              alt={review.userId?.name}
              sx={{ width: 48, height: 48 }}
            >
              {review.userId?.name ? 
                review.userId.name.charAt(0).toUpperCase() : 
                <PersonIcon />
              }
            </Avatar>
            
            <Stack sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {review.userId?.name || 'Anonymous User'}
              </Typography>
              
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  ({review.rating}/5)
                </Typography>
              </Stack>
              
              <Typography variant="caption" color="text.secondary">
                Reviewed on {formatDate(review.createdAt)}
              </Typography>
            </Stack>
          </Stack>

          {isOwner && (
            <Stack direction="row" spacing={1}>
              <IconButton 
                color="primary" 
                size="small"
                onClick={() => onEdit(review)}
                sx={{ '&:hover': { backgroundColor: 'primary.light', color: 'white' } }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                color="error" 
                size="small"
                onClick={() => onDelete(review._id)}
                sx={{ '&:hover': { backgroundColor: 'error.light', color: 'white' } }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Stack>

        <Box mt={2}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {displayComment}
          </Typography>
          
          {isLongComment && (
            <Button
              size="small"
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{ 
                mt: 1, 
                p: 0, 
                minWidth: 'auto',
                textTransform: 'none',
                fontSize: '0.75rem'
              }}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </Box>

        {review.updatedAt !== review.createdAt && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Edited on {formatDate(review.updatedAt)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}