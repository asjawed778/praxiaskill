import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import CustomButton from "./CustomButton";

const DialogBoxWrapper = ({ open, onClose, onConfirm, title, message, isLoading }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>{message}</Typography>
    </DialogContent>
    <DialogActions>
      <CustomButton 
        label="Cancel"
        variant="text"
        color="error"
        onClick={onClose}
      /> 
      <CustomButton 
        label="Confirm"
        variant="text"
        color="secondary"
        loading={isLoading}
        onClick={onConfirm}
      />
    </DialogActions>
  </Dialog>
);

export default DialogBoxWrapper;
