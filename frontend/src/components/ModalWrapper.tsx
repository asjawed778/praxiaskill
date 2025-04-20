import React from "react";
import { Modal, Box, Typography, IconButton, Grow } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface WrapperModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number | string;
}

const ModalWrapper: React.FC<WrapperModalProps> = ({ 
    open, 
    onClose, 
    title, 
    children, 
    width = 500 
}) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Grow in={open} >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: width,
              maxWidth: "90vw",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              textAlign: "center",
            //   overflowY: "auto",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
              color="error"
            >
              <CloseIcon />
            </IconButton>
            {title && (
              <Typography id="modal-title" variant="h6" component="h2" mb={2}>
                {title}
              </Typography>
            )}
            <Box sx={{ maxHeight: "75vh", overflowY: "auto" }}>{children}</Box>
          </Box>
        </Box>
      </Grow>
    </Modal>
  );
};

export default ModalWrapper;
