import React from 'react';
import { Card, CardContent, Box, Avatar, Typography, IconButton } from '@mui/material';
import { ArrowUpward as UpvoteIcon } from '@mui/icons-material';

const ReplyCard = ({ reply }) => (
  <Card variant="outlined" sx={{ mb: 1, boxShadow: 0 }}>
    <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 20, height: 20, mr: 1, fontSize: '0.75rem', bgcolor: 'secondary.main' }}>
            {reply.author.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {reply.author} • {reply.date}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small">
            <UpvoteIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
            {reply.votes}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2">{reply.content}</Typography>
    </CardContent>
  </Card>
);

export default ReplyCard;
