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
  closeIcon = true,
  allowOutsideClick = true,
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
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: isMobile ? "16px 16px 0 0" : 2,
            mx: isMobile ? 0 : 2,
            alignSelf: isMobile ? "flex-end" : "center",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: isMobile ? "80dvh" : "90dvh",
            height: "auto",
          },
        },
      }}
    >
      {closeIcon && !isMobile && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: -2,
            right: -2,
            color: "text.secondary",
            '&:hover': {
              color: "error.main"
            },
            zIndex: 10,
          }}
        >
          <CloseIcon fontSize="small"/>
        </IconButton>
      )}

      {title && <DialogTitle sx={{ py: 1, display: "flex",
      justifyContent: "center",  
      alignItems: "center",}}>{title}</DialogTitle>}

      <DialogContent
        // dividers
        sx={{
          overflowY: "auto",
          p: 0,
        }}
      >
        <Box px={2} py={1}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
