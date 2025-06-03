import { Modal, Box, Typography, IconButton, Grow, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalWrapper = ({
  open,
  onClose,
  title,
  children,
  width = 400,
  close = true,  
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Grow in={open}>
        <Box
          sx={{
            display: "flex",
            alignItems: isMobile ? "flex-end" : "center",
            justifyContent: "center",
            height: "100vh",
            overflow: "auto",
            p: isMobile ? 0 : 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: isMobile ? "100%" : width,
              maxWidth: "90vw",
              maxHeight: isMobile ? "70vh" : "90vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: {xs: 1.5, sm: 2},
              borderRadius: isMobile ? "16px 16px 0 0" : 2,
              textAlign: "center",
            }}
          >
            {close && (
              <IconButton
                onClick={onClose}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "error.main",
                }}
              >
                <CloseIcon />
              </IconButton>
            )}

            {title && (
              <Typography id="modal-title" variant="h6" component="h2" mb={2}>
                {title}
              </Typography>
            )}

            <Box sx={{ maxHeight: isMobile ? "55vh" : "75vh", overflowY: "auto" }} p={1}>
              {children}
            </Box>
          </Box>
        </Box>
      </Grow>
    </Modal>
  );
};

export default ModalWrapper;
