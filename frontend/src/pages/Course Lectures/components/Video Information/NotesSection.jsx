// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Paper,
//   InputAdornment,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";

// // Notes component that can be integrated with your existing video player
// const NotesSection = ({ currentVideoId, currentTimestamp }) => {
//   // Notes state
//   const [notes, setNotes] = useState([
//     {
//       id: 1,
//       courseId: 1,
//       content: "React components must start with capital letter",
//       timestamp: "05:30",
//       tags: ["React", "Basics"],
//     },
//     {
//       id: 2,
//       courseId: 1,
//       content: "JSX allows embedding JavaScript expressions with curly braces",
//       timestamp: "12:45",
//       tags: ["JSX", "Syntax"],
//     },
//     {
//       id: 3,
//       courseId: 2,
//       content: "MUI provides pre-built React components",
//       timestamp: "03:20",
//       tags: ["MUI", "Components"],
//     },
//   ]);

//   // UI state
//   const [noteContent, setNoteContent] = useState("");
//   const [editingNoteId, setEditingNoteId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
// //   const [tagFilter, setTagFilter] = useState("");
//   const [openAddNoteDialog, setOpenAddNoteDialog] = useState(false);
// //   const [newNoteTag, setNewNoteTag] = useState("");
// //   const [newNoteTags, setNewNoteTags] = useState([]);
// //   const [filteredQuestions, setFilteredQuestions] = useState(initialQuestions);

//   // Extract all unique tags from notes
// //   const allTags = [...new Set(notes.flatMap((note) => note.tags))];

//   // Add new note
//   const handleAddNote = () => {
//     if (noteContent.trim() === "") return;

//     const newNote = {
//       id: notes.length + 1,
//       courseId: currentVideoId,
//       content: noteContent,
//     //   timestamp: currentTimestamp || "00:00", // Use current video timestamp
//     //   tags: [...newNoteTags],
//     };

//     setNotes([...notes, newNote]);
//     setNoteContent("");
//     // setNewNoteTags([]);
//     setOpenAddNoteDialog(false);
//   };

//   // Edit existing note
//   const handleEditNote = (noteId) => {
//     const noteToEdit = notes.find((note) => note.id === noteId);
//     if (noteToEdit) {
//       setNoteContent(noteToEdit.content);
//     //   setNewNoteTags([...noteToEdit.tags]);
//       setEditingNoteId(noteId);
//       setOpenAddNoteDialog(true);
//     }
//   };

//   // Update existing note
//   const handleUpdateNote = () => {
//     if (noteContent.trim() === "") return;

//     const updatedNotes = notes.map((note) =>
//       note.id === editingNoteId
//         ? { ...note, content: noteContent }
//         : note
//     );

//     setNotes(updatedNotes);
//     setNoteContent("");
//     // setNewNoteTags([]);
//     setEditingNoteId(null);
//     setOpenAddNoteDialog(false);
//   };

//   // Delete note
//   const handleDeleteNote = (noteId) => {
//     setNotes(notes.filter((note) => note.id !== noteId));
//   };

//   // Add tag to current note
// //   const handleAddTag = () => {
// //     if (newNoteTag.trim() === "") return;
// //     if (!newNoteTags.includes(newNoteTag)) {
// //       setNewNoteTags([...newNoteTags, newNoteTag]);
// //     }
// //     setNewNoteTag("");
// //   };

//   // Remove tag from current note
// //   const handleRemoveTag = (tagToRemove) => {
// //     setNewNoteTags(newNoteTags.filter((tag) => tag !== tagToRemove));
// //   };

// //   Filter notes based on search query and tag filter
//   const filteredNotes = notes.filter((note) => {
//     const matchesCourse = note.courseId === currentVideoId;
//     const matchesSearch =
//       searchQuery === "" ||
//       note.content.toLowerCase().includes(searchQuery.toLowerCase());
//     // const matchesTag = tagFilter === "" || note.tags.includes(tagFilter);

//     // return matchesCourse && matchesSearch && matchesTag;
//   });

//     //  useEffect(() => {

//     //     // Apply sorting
//     //     switch (filterValue) {
//     //       case 'newest':
//     //         result.sort((a, b) => new Date(b.date) - new Date(a.date));
//     //         break;
//     //       case 'oldest':
//     //         result.sort((a, b) => new Date(a.date) - new Date(b.date));
//     //         break;
//     //       case 'Current Lecture':
//     //         result.sort((a, b) => b.votes - a.votes);
//     //         break;
//     //       case 'Course':
//     //         result.sort((a, b) => b.replies.length - a.replies.length);
//     //         break;
//     //       default:
//     //         break;
//     //     }

//     //     setFilteredQuestions(result);
//     //   }, [questions, searchQuery, filterValue]);
//   return (
//     <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <Typography variant="h6">Lecture Notes</Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => {
//             setEditingNoteId(null);
//             setNoteContent("");
//             setNewNoteTags([]);
//             setOpenAddNoteDialog(true);
//           }}
//         >
//           Add Note
//         </Button>
//       </Box>

//       {/* Search and Filter Controls */}
//       <Box sx={{ mb: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Search notes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               size="small"
//             />
//           </Grid>
//           {/* <Grid item xs={12} md={6}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Filter by Tag</InputLabel>
//               <Select
//                 value={tagFilter}
//                 onChange={(e) => setTagFilter(e.target.value)}
//                 label="Filter by Tag"
//               >
//                 <MenuItem value="">All Tags</MenuItem>
//                 {allTags.map((tag) => (
//                   <MenuItem key={tag} value={tag}>{tag}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid> */}
//           <Grid item xs={6} md={3}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Filter by</InputLabel>
//               <Select
//                 value={filterValue}
//                 size="small"
//                 // onChange={handleFilterChange}
//                 label="Filter by"
//                 startAdornment={
//                   <FilterIcon sx={{ mr: 1, color: "text.secondary" }} />
//                 }
//               >
//                 <MenuItem value="newest">Newest</MenuItem>
//                 <MenuItem value="oldest">Oldest</MenuItem>
//                 <MenuItem value="most_votes">Current Lecture</MenuItem>
//                 <MenuItem value="most_replies">Course</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Notes List */}
//       <Box sx={{ maxHeight: "500px", overflow: "auto" }}>
//         {filteredNotes.length === 0 ? (
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             sx={{ textAlign: "center", py: 3 }}
//           >
//             No notes found. Start adding notes for this lecture!
//           </Typography>
//         ) : (
//           filteredNotes.map((note) => (
//             <Card key={note.id} sx={{ mb: 2 }}>
//               <CardContent>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mb: 1,
//                   }}
//                 >
//                   {/* <Typography variant="caption" color="textSecondary">
//                     Timestamp: {note.timestamp}
//                   </Typography> */}
//                   <Typography variant="body1">{note.content}</Typography>
//                   <Box>
//                     <IconButton
//                       size="small"
//                       onClick={() => handleEditNote(note.id)}
//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton
//                       size="small"
//                       onClick={() => handleDeleteNote(note.id)}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </Box>
//                 <Box
//                   sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}
//                 >
//                   {note.tags.map((tag) => (
//                     <Chip key={tag} label={tag} size="small" />
//                   ))}
//                 </Box>
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </Box>

//       {/* Add/Edit Note Dialog */}
//       <Dialog
//         open={openAddNoteDialog}
//         onClose={() => setOpenAddNoteDialog(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           {editingNoteId ? "Edit Note" : "Add New Note"}
//         </DialogTitle>
//         <DialogContent>
//           {/* <DialogContentText>
//             Add your note for the current timestamp ({currentTimestamp || '00:00'})
//           </DialogContentText> */}
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Note Content"
//             type="text"
//             fullWidth
//             multiline
//             rows={4}
//             variant="outlined"
//             value={noteContent}
//             onChange={(e) => setNoteContent(e.target.value)}
//             sx={{ mb: 2 }}
//           />

//           {/* <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle2" gutterBottom>Tags</Typography>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
//               {newNoteTags.map((tag) => (
//                 <Chip
//                   key={tag}
//                   label={tag}
//                   onDelete={() => handleRemoveTag(tag)}
//                   size="small"
//                 />
//               ))}
//             </Box>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <TextField
//                 size="small"
//                 label="Add Tag"
//                 value={newNoteTag}
//                 onChange={(e) => setNewNoteTag(e.target.value)}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     handleAddTag();
//                     e.preventDefault();
//                   }
//                 }}
//               />
//               <Button variant="outlined" onClick={handleAddTag}>Add</Button>
//             </Box>
//           </Box> */}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenAddNoteDialog(false)}>Cancel</Button>
//           <Button
//             onClick={editingNoteId ? handleUpdateNote : handleAddNote}
//             variant="contained"
//           >
//             {editingNoteId ? "Update" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// // Example of how to integrate with your existing video player
// const ExampleUsage = () => {
//   // These values would come from your video player component
//   const currentVideoId = 1;
//   const currentTimestamp = "08:45";

//   return (
//     <Grid container spacing={3}>
//       {/* Your existing video player would go here */}
//       <Grid item xs={12} md={8}>
//         {/* Video Player Component */}
//       </Grid>

//       {/* Notes section */}
//       <Grid item xs={12} md={4}>
//         <NotesSection
//           currentVideoId={currentVideoId}
//           currentTimestamp={currentTimestamp}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default NotesSection;



import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const NotesSection = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteContent, setEditNoteContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddNoteClick = () => {
    setOpenDialog(true);
  };

  const handleNewNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newNoteObj = {
        id: Date.now().toString(),
        content: newNote,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      setNotes([...notes, newNoteObj]);
      setNewNote("");
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewNote("");
    setEditNoteId(null);
    setEditNoteContent("");
  };

  const handleEditNote = () => {
    const updatedNotes = notes.map((note) =>
      note.id === editNoteId ? { ...note, content: editNoteContent } : note
    );
    setNotes(updatedNotes);
    setEditNoteId(null);
    setEditNoteContent("");
    setOpenDialog(false);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNoteClick = (id, content) => {
    setEditNoteId(id);
    setEditNoteContent(content);
    setOpenDialog(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter === "all" || note.status === filter)
  );

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid items xs={12} md={6} >
          <TextField
            label="Search Notes"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid items xs={6} md={3}>
          <FormControl fullWidth sx={{ minWidth: 120 }}>
            <InputLabel>Filter By</InputLabel>
            <Select
            size="small"
            width="75px"
              value={filter}
              onChange={handleFilterChange}
              label="Filter By"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="currentLecture">Current Lecture</MenuItem>
              <MenuItem value="course">Course</MenuItem>
            </Select>
          </FormControl>
        </Grid >
        <Grid items xs={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddNoteClick}
          >
            Add Note
          </Button>
        </Grid>
      </Grid>

      {/* Notes List */}
      <Box mt={4}>
        {filteredNotes.length === 0 ? (
          <Typography variant="body1" color="textSecondary" align="center">
            No notes found.
          </Typography>
        ) : (
          <List>
            {filteredNotes.map((note) => (
              <ListItem
                key={note.id}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  mb: 1,
                  px: 2,
                }}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      onClick={() =>
                        handleEditNoteClick(note.id, note.content)
                      }
                      color="secondary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteNote(note.id)}
                      color="primary"
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={note.content}
                  secondary={`Created on: ${new Date(
                    note.createdAt
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editNoteId ? "Edit Note" : "Add New Note"}</DialogTitle>
        <DialogContent>
          <TextField
          margin="normal"
            label="Notes Details"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={editNoteId ? editNoteContent : newNote}
            onChange={(event) =>
              editNoteId
                ? setEditNoteContent(event.target.value)
                : setNewNote(event.target.value)
            }
            placeholder="Write your note here"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={editNoteId ? handleEditNote : handleAddNote}
          >
            {editNoteId ? "Update" : "Add Note"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotesSection;
