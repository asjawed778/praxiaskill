import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from '@mui/material';

export default function AnnouncementDialog({ open, onClose, onSave, initialData }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (open) {
      setTitle(initialData?.title || '');
      setMessage(initialData?.message || '');
    }
  }, [open, initialData]);

  const handleSubmit = () => {
    if (!title || !message) return;
    const newAnnouncement = {
      id: initialData?.id || Date.now(),
      title,
      message,
    };
    onSave(newAnnouncement);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Announcement' : 'New Announcement'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Update' : 'Post'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
