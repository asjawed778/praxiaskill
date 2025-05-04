import React from 'react';
import { Card, CardContent, Typography, Stack, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AnnouncementCard({ announcement, onEdit, onDelete }) {
  return (
    <Card sx={{ mb: 2, width: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{announcement.title}</Typography>
          <Stack direction="row">
            <IconButton color="secondary" onClick={() => onEdit(announcement)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(announcement.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant="body2" mt={1}>
          {announcement.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
