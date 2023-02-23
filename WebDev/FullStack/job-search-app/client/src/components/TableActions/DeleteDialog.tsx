import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_APP } from "../../mutations/clientMutations";
import { GET_APPLICATIONS } from "../../queries/clientQueries";
import ApplicationInterface from "../../interfaces/ApplicationInterfaces";

import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

interface DeleteDialogInterface {
  id: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

const DialogHeader = styled(DialogTitle)({
  backgroundColor: red[100],
  color: red[900],
  fontWeight: "bold",
});

const DialogBody = styled(DialogContent)({
  textAlign: "center",
});

function DeleteDialog({ isOpen, setIsOpen, id }: DeleteDialogInterface) {
  const [deleteApp] = useMutation(DELETE_APP, {
    variables: { id: id },
    update(cache) {
      const cachedData = cache.readQuery({
        query: GET_APPLICATIONS,
      }) as any;
      const appList: ApplicationInterface[] = cachedData["getApps"];
      cache.writeQuery({
        query: GET_APPLICATIONS,
        data: {
          getApps: appList.filter((app: ApplicationInterface) => app.id !== id),
        },
      });
    },
  });

  const handleDeleteApp = () => {
    deleteApp();
    setIsOpen();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogHeader id="modal-title">Deletion Warning!</DialogHeader>
        <DialogBody id="modal-description">
          <DialogContentText marginTop={3}>
            Are you sure you want to delete this Application?
          </DialogContentText>
          <DialogContentText>You cannot undo this action.</DialogContentText>
        </DialogBody>
        <DialogActions style={{ marginBottom: "5px" }}>
          <Button onClick={setIsOpen} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteApp} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteDialog;
