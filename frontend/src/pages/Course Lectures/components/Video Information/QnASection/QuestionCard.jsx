import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Avatar,
  IconButton, Divider, CardActions, Button, TextField
} from '@mui/material';
import { ArrowUpward, ChatBubbleOutline, Send } from '@mui/icons-material';
import ReplyCard from './ReplyCard';

const QuestionCard = ({ question, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(question.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>{question.title}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{question.description}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
              {question.author.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {question.author} • {question.date}
            </Typography>
          </Box>
          <Box>
            <IconButton size="small"><ArrowUpward fontSize="small" /></IconButton>
            <Typography variant="body2" component="span" sx={{ ml: 0.5, mr: 2 }}>{question.votes}</Typography>
            <IconButton size="small" onClick={() => setShowReplies(!showReplies)}>
              <ChatBubbleOutline fontSize="small" />
            </IconButton>
            <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
              {question.replies.length}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Divider />

      <CardActions>
        <Button startIcon={<ChatBubbleOutline />} onClick={() => setShowReplyInput(!showReplyInput)} size="small">
          Reply
        </Button>
      </CardActions>

      {showReplyInput && (
        <Box sx={{ p: 2, pt: 0 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="small" onClick={() => setShowReplyInput(false)} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" size="small" onClick={handleReplySubmit} endIcon={<Send />}>Submit</Button>
          </Box>
        </Box>
      )}

      {showReplies && question.replies.length > 0 && (
        <Box sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Replies ({question.replies.length})
          </Typography>
          {question.replies.map(reply => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
        </Box>
      )}
    </Card>
  );
};

export default QuestionCard;
