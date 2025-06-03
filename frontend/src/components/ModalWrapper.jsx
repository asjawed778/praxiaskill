import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
  Slide,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef } from "react";

const SlideTransition = forwardRef(function SlideTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalWrapper = ({
  open,
  onClose,
  title,
  children,
  width = 400,
  close = true,
  allowOutsideClick = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      if (isMobile || allowOutsideClick) {
        onClose?.(event, reason);
      } else {
        return;
      }
    } else {
      onClose?.(event, reason);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      scroll="paper"
      slots={{
        transition: SlideTransition, 
      }}
      slotProps={{
        paper: {
          sx: {
            position: "relative",
            width: isMobile ? "100%" : width,
            maxWidth: "100%",
            maxHeight: isMobile ? "60vh" : "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: isMobile ? "16px 16px 0 0" : 2,
            mx: isMobile ? 0 : 2,
            textAlign: "center",
            alignSelf: isMobile ? "flex-end" : "center",
            overflow: "hidden",
          },
        },
      }}
    >
      {close && !isMobile && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "error.main",
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      {title && <DialogTitle sx={{ mb: 1, p: 0 }}>{title}</DialogTitle>}

      <DialogContent
        dividers
        sx={{
          maxHeight: isMobile ? "calc(70vh - 60px)" : "75vh",
          overflowY: "auto",
          p: 0,
        }}
      >
        <Box p={2}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
