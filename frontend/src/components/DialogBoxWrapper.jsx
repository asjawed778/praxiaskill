import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const DialogBoxWrapper = ({ open, onClose, onConfirm, title, message }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button color="secondary" onClick={onConfirm} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogBoxWrapper;
