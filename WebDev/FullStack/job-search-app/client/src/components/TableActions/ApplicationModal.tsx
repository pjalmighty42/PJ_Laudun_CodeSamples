import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import ApplicationInterface from "../../interfaces/ApplicationInterfaces";
import { styled } from "@mui/material/styles";
import { yellow, green } from "@mui/material/colors";

const DialogHeaderEdit = styled(DialogTitle)({
  backgroundColor: yellow[100],
  color: yellow[900],
  fontWeight: "bold",
});

const DialogHeaderNew = styled(DialogTitle)({
  backgroundColor: green[100],
  color: green[900],
  fontWeight: "bold",
});

interface ApplicationModalProps {
  isOpen: boolean;
  isEdit: boolean;
  selId: string;
  setIsOpen: () => void;
}

function ApplicaionModal({ isOpen, isEdit, setIsOpen }: ApplicationModalProps) {
  return (
    <>
      <Dialog
        aria-labelledby="modal-title"
        open={isOpen}
        onClose={setIsOpen}
        fullWidth={true}
        maxWidth="lg"
      >
        {isEdit ? (
          <DialogHeaderEdit id="modal-title">Edit Application</DialogHeaderEdit>
        ) : (
          <DialogHeaderNew id="modal-title">
            Create New Application
          </DialogHeaderNew>
        )}
        <DialogContent></DialogContent>
        <DialogActions style={{ marginBottom: "5px" }}>
          <Button
            onClick={setIsOpen}
            variant="outlined"
            color="secondary"
            role="button"
            aria-label={
              isEdit ? "Cancel Edit Application" : "Cancel New Application"
            }
          >
            Cancel
          </Button>
          <Button
            onClick={() => {}}
            color={isEdit ? "warning" : "success"}
            variant="contained"
            role="submit"
            aria-label={
              isEdit ? "Save Edited Application" : "Save New Application"
            }
          >
            {isEdit ? "Save Edit" : "Save New"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ApplicaionModal;
