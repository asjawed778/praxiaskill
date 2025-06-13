import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
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
  CircularProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInputField from "@/components/CustomInputField";
import {
  useCreateCourseNotesMutation,
  useDeleteNotesMutation,
  useGetNotesQuery,
  useUpdateNotesMutation,
} from "../../../../services/course.api";
import CustomButton from "@/components/CustomButton";
import CustomSearchField from "@/components/CustomSearchField";
import CustomDropdownField from "@/components/CustomDropdownField";

const noteSchema = yup.object().shape({
  content: yup.string().required("Note content is required").min(5).max(500),
});

const NotesSection = ({ courseId, section }) => {
  const [page, setPage] = useState(1);
  const [allNotes, setAllNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("latest");
  const [editNoteId, setEditNoteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [createNotes, { isLoading }] = useCreateCourseNotesMutation();
  const { data: notesData, isLoading: notesLoading, isError } = useGetNotesQuery(
    {
      courseId,
      page,
      limit: 10,
      search: searchQuery,
      sort: filter,
      ...(section?.sectionId && { sectionId: section.sectionId }),
      ...(section?.subSectionId && { subSectionId: section.subSectionId }),
    },
    {
      skip: !courseId,
    }
  );
  const [deleteNotes] = useDeleteNotesMutation();
  const [updateNotes] = useUpdateNotesMutation();

  useEffect(() => {
    if (notesData?.data?.notes?.length) {
      setAllNotes((prevNotes) => {
        const newNotes = notesData.data.notes;
        const uniqueNotesMap = new Map();
        [...prevNotes, ...newNotes].forEach((note) => {
          uniqueNotesMap.set(note._id, note);
        });
        return Array.from(uniqueNotesMap.values());
      });
    }
  }, [notesData]);

  useEffect(() => {
    setPage(1);
    setAllNotes([]);
  }, [searchQuery, filter, section?.sectionId, section?.subSectionId]);

  const methods = useForm({
    resolver: yupResolver(noteSchema),
    defaultValues: { content: "" },
  });
  const { handleSubmit, reset } = methods;

  const handleAddNoteClick = () => {
    setEditNoteId(null);
    reset({ content: "" });
    setOpenDialog(true);
  };

  const handleEditNoteClick = (id, content) => {
    setEditNoteId(id);
    setOpenDialog(true);
    reset({ content });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset({ content: "" });
    setEditNoteId(null);
  };

  const filterOptions = [
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
  ];

  const onSubmit = async (data) => {
    try {
      if (editNoteId) {
        const res = await updateNotes({
          noteId: editNoteId,
          notes: { notes: data.content.trim() },
        }).unwrap();
        setAllNotes((prev) =>
          prev.map((note) =>
            note._id === editNoteId
              ? { ...note, notes: data.content.trim() }
              : note
          )
        );
        toast.success("Note updated successfully!");
      } else {
        const payload = {
          courseId,
          body: { notes: data.content.trim() },
        };

        if (section?.sectionId) {
          payload.sectionId = section.sectionId;
        }

        if (section?.subSectionId) {
          payload.subSectionId = section.subSectionId;
        }
        const res = await createNotes(payload).unwrap();
        setAllNotes((prev) => [
          { ...res.data, createdAt: new Date().toISOString() },
          ...prev,
        ]);
        toast.success("Note added successfully!");
      }
    } catch (error) {
      console.error("Create note error:", error);
      toast.error(
        error?.data?.message || "Failed to add note. Please try again."
      );
    } finally {
      reset();
      setOpenDialog(false);
      setEditNoteId(null);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNotes(id).unwrap();
      setAllNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully.");
    } catch (error) {
      console.error("Delete note error:", error);
      toast.error(error?.data?.message || "Failed to delete note.");
    }
  };

  const hasMore = notesData?.data?.currentPage < notesData?.data?.totalPages;

  return (
    <Box>
      <Grid container spacing={2} alignItems="flex-end" mt={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomSearchField
            label="Search Notes"
            onSearch={(query) => setSearchQuery(query)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" flexDirection="row" gap={2}>
            <CustomDropdownField
              label="Filter By"
              value={filter}
              onChange={(val) => setFilter(val)}
              options={filterOptions}
            />
            <CustomButton label="Add Note" onClick={handleAddNoteClick} />
          </Box>
        </Grid>
      </Grid>
      <Box mt={2}>
        {notesLoading ? (
          <Box textAlign="center" mt={2}>
            <CircularProgress size={24} />
          </Box>
        ) : allNotes.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No notes found.
          </Typography>
        ) : (
          <List>
            {allNotes.map((note) => (
              <ListItem
                key={note._id}
                sx={{ border: "1px solid #ddd", borderRadius: 1, mb: 1, px: 2 }}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      onClick={() => handleEditNoteClick(note._id, note.notes)}
                      color="secondary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteNote(note._id)}
                      color="primary"
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={note.notes}
                  secondary={`Created on: ${new Date(
                    note.createdAt
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        )}

        {hasMore && (
          <Box textAlign="center" mt={2}>
            <CustomButton
              label="Load More"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={notesLoading}
            />
            {notesLoading && (
              <Box mt={1}>
                <CircularProgress size={24} />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
              {editNoteId ? "Edit Note" : "Add New Note"}
            </DialogTitle>
            <DialogContent>
              <CustomInputField
                name="content"
                label="Note Details"
                placeholder="Write your note here"
                multiline
                rows={4}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <CustomButton
                label="Cancel"
                variant="text"
                onClick={handleCloseDialog}
              />
              <CustomButton
                label={editNoteId ? "Update" : "Submit"}
                type="submit"
                loading={isLoading}
              />
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </Box>
  );
};

export default NotesSection;