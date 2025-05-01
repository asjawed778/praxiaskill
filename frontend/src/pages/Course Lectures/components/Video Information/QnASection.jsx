import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ArrowUpward as UpvoteIcon,
  ChatBubbleOutline as ReplyIcon,
  Close as CloseIcon,
  Send as SendIcon
} from '@mui/icons-material';

// Sample data for questions
const initialQuestions = [
  {
    id: 1,
    title: "How do I implement authentication in React?",
    description: "I'm building a React app and need to add user authentication. What's the best approach?",
    author: "dev_user123",
    date: "April 20, 2025",
    votes: 15,
    replies: [
      {
        id: 1,
        author: "react_expert",
        content: "You can use libraries like Firebase Auth, Auth0, or implement your own JWT-based authentication.",
        date: "April 21, 2025",
        votes: 8
      },
      {
        id: 2,
        author: "security_dev",
        content: "I recommend using OAuth 2.0 with a trusted provider. It's secure and handles most edge cases.",
        date: "April 22, 2025",
        votes: 6
      }
    ]
  },
  {
    id: 2,
    title: "Best practices for Material UI theming?",
    description: "I'm trying to create a consistent theme across my MUI application. What are some best practices?",
    author: "ui_designer",
    date: "April 18, 2025",
    votes: 23,
    replies: [
      {
        id: 1,
        author: "mui_lover",
        content: "Create a theme using createTheme and use ThemeProvider to wrap your app. Define colors, typography, and component overrides consistently.",
        date: "April 19, 2025",
        votes: 12
      }
    ]
  },
  {
    id: 3,
    title: "How to optimize React component performance?",
    description: "My React application is getting slow. What techniques can I use to improve performance?",
    author: "performance_seeker",
    date: "April 25, 2025",
    votes: 32,
    replies: [
      {
        id: 1,
        author: "react_optimizer",
        content: "Use React.memo for functional components, implement shouldComponentUpdate for class components, and use virtualization for long lists.",
        date: "April 26, 2025",
        votes: 18
      },
      {
        id: 2,
        author: "js_expert",
        content: "Also consider code splitting and lazy loading components that aren't needed on initial load.",
        date: "April 27, 2025",
        votes: 14
      }
    ]
  }
];

const QuestionCard = ({ question, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleUpvote = () => {
    // Logic to handle upvoting
  };

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      // Add reply logic here
      onReply(question.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          {question.title}
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          {question.description}
        </Typography>
        
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
            <IconButton 
              size="small" 
              aria-label="upvote" 
              onClick={handleUpvote}
            >
              <UpvoteIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" component="span" sx={{ ml: 0.5, mr: 2 }}>
              {question.votes}
            </Typography>
            <IconButton 
              size="small" 
              aria-label="replies" 
              onClick={() => setShowReplies(!showReplies)}
            >
              <ReplyIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
              {question.replies.length}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      
      <Divider />
      
      <CardActions>
        <Button 
          startIcon={<ReplyIcon />} 
          onClick={() => setShowReplyInput(!showReplyInput)}
          size="small"
        >
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
            <Button 
              size="small" 
              onClick={() => setShowReplyInput(false)}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              size="small" 
              onClick={handleReplySubmit}
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
      
      {showReplies && question.replies.length > 0 && (
        <Box sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Replies ({question.replies.length})
          </Typography>
          {question.replies.map(reply => (
            <Card key={reply.id} variant="outlined" sx={{ mb: 1, boxShadow: 0 }}>
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
                    <IconButton size="small" aria-label="upvote">
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
          ))}
        </Box>
      )}
    </Card>
  );
};

const QnASection = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('newest');
  const [openAskDialog, setOpenAskDialog] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', description: '' });
  const [filteredQuestions, setFilteredQuestions] = useState(initialQuestions);

  // Handle search and filter
  useEffect(() => {
    let result = [...questions];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(q => 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (filterValue) {
      case 'newest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'most_votes':
        result.sort((a, b) => b.votes - a.votes);
        break;
      case 'most_replies':
        result.sort((a, b) => b.replies.length - a.replies.length);
        break;
      default:
        break;
    }
    
    setFilteredQuestions(result);
  }, [questions, searchQuery, filterValue]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleOpenAskDialog = () => {
    setOpenAskDialog(true);
  };

  const handleCloseAskDialog = () => {
    setOpenAskDialog(false);
  };

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitQuestion = () => {
    const { title, description } = newQuestion;
    if (title.trim() && description.trim()) {
      const newQuestionData = {
        id: questions.length + 1,
        title,
        description,
        author: "current_user", // In a real app, use authenticated user
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        votes: 0,
        replies: []
      };
      
      setQuestions([newQuestionData, ...questions]);
      setNewQuestion({ title: '', description: '' });
      handleCloseAskDialog();
    }
  };

  const handleAddReply = (questionId, replyText) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newReply = {
          id: q.replies.length + 1,
          author: "current_user", // In a real app, use authenticated user
          content: replyText,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          votes: 0
        };
        return { ...q, replies: [...q.replies, newReply] };
      }
      return q;
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1"  gutterBottom sx={{ mb: 3 }}>
        Community Q&A
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search questions..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </Grid>
        
        <Grid item xs={6} md={3} >
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by</InputLabel>
            <Select
              value={filterValue}
              size="small"
              onChange={handleFilterChange}
              label="Filter by"
              startAdornment={<FilterIcon sx={{ mr: 1, color: 'text.secondary' }} />}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="most_votes">Most Votes</MenuItem>
              <MenuItem value="most_replies">Most Replies</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={6} md={3}>
          <Button 
            fullWidth 
            // size="small"
            variant="contained" 
            color="primary" 
            onClick={handleOpenAskDialog}
            // sx={{ height: '56px' }}
          >
            Ask a Question
          </Button>
        </Grid>
      </Grid>
      
      <Box>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(question => (
            <QuestionCard 
              key={question.id} 
              question={question} 
              onReply={handleAddReply}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6">No questions found</Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or be the first to ask a question!
            </Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }} 
              onClick={handleOpenAskDialog}
            >
              Ask a Question
            </Button>
          </Box>
        )}
      </Box>
      
      {/* Ask Question Dialog */}
      <Dialog 
        open={openAskDialog} 
        onClose={handleCloseAskDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Ask a Question
            <IconButton size="small" onClick={handleCloseAskDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            size="small"
            margin="dense"
            name="title"
            label="Question Title"
            fullWidth
            variant="outlined"
            value={newQuestion.title}
            onChange={handleNewQuestionChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Question Details"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={newQuestion.description}
            onChange={handleNewQuestionChange}
            sx={{ mb: 2 }}
          />

        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseAskDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitQuestion}
            endIcon={<SendIcon />}
          >
            Publish Question
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QnASection;