import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AnnouncementCard from './AnnouncementCard';
import AnnouncementDialog from './AnnouncementDialog';

export default function AnnouncementSection() {
  const [announcements, setAnnouncements] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleAddClick = () => {
    setCurrent(null);
    setDialogOpen(true);
  };

  const handleSave = (announcement) => {
    setAnnouncements((prev) =>
      prev.some((a) => a.id === announcement.id)
        ? prev.map((a) => (a.id === announcement.id ? announcement : a))
        : [...prev, announcement]
    );
  };

  const handleEdit = (announcement) => {
    setCurrent(announcement);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>📢 Announcements</Typography>
      <Button variant="contained" onClick={handleAddClick} sx={{ mb: 2 }}>
        Add Announcement
      </Button>

      {announcements.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No announcements yet.
        </Typography>
      ) : (
        announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}

      <AnnouncementDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={current}
      />
    </Box>
  );
}
