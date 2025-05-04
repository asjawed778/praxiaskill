import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import AskQuestionDialog from './AskQuestionDialog';
import QuestionCard from './QuestionCard';
import dummyQuestions from './dummyData';
import toast from 'react-hot-toast';
import { useCreateQnaMutation } from '../../../../../services/qnaApi';
// import QuestionCard from '../components/QuestionCard';
// import AskQuestionDialog from '../components/AskQuestionDialog';
// import dummyQuestions from '../data/dummyData';

const QnASection = ({ course }) => {
  const [questions, setQuestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', description: '' });
  const [createQna] = useCreateQnaMutation()

  useEffect(() => {
    setQuestions(dummyQuestions);
  }, []);

  const handleReply = (questionId, replyContent) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              replies: [
                ...q.replies,
                {
                  id: Date.now(),
                  content: replyContent,
                  author: 'User',
                  date: new Date().toISOString().split('T')[0],
                  votes: 0
                }
              ]
            }
          : q
      )
    );
  };

//   const handleCreateQna = () => {
//     const newQ = {
//       id: Date.now(),
//       title: newQuestion.title,
//       description: newQuestion.description,
//       author: 'User',
//       date: new Date().toISOString().split('T')[0],
//       votes: 0,
//       replies: []
//     };
//     setQuestions([newQ, ...questions]);
//     setNewQuestion({ title: '', description: '' });
//     setOpenDialog(false);
//   };


const handleCreateQna = async (newQna) => {
    console.log("Form data2: ", newQna);
    console.log("Course id: ", course._id);
    
    
    try {
      await createQna({courseId: course._id, newQna}).unwrap();
      
      toast.success('Question posted successfully!');
      setOpenDialog(false);
    } catch (error) {
        console.error(error)
      toast.error('Failed to post question.');
    }
  };
  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Community Q&A</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>Ask a Question</Button>
      </Box>

      <AskQuestionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCreateQna}
        // question={newQuestion}
        // setQuestion={setNewQuestion}
      />

      <Box>
        {questions.map(q => (
          <QuestionCard key={q.id} question={q} onReply={handleReply} />
        ))}
      </Box>
    </Container>
  );
};

export default QnASection;
