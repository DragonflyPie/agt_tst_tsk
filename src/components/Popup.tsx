import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";

interface PopupProps {
  text: string;
}

const Popup = ({ text }: PopupProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus color="error">
          ОК
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
