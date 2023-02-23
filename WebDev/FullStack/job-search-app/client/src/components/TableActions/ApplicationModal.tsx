import { ReactElement, useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Checkbox,
  Box,
} from "@mui/material";
import ApplicationInterface from "../../interfaces/ApplicationInterfaces";
import { styled } from "@mui/material/styles";
import { yellow, green, grey } from "@mui/material/colors";
import { Label } from "@mui/icons-material";

const ColumnBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

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

const DialogSubHeader = styled(DialogContentText)({
  marginTop: "1em",
  marginBottom: ".5em",
  borderBottom: "2px solid",
  borderColor: grey[500],
  fontSize: "1.25em",
  fontWeight: "bold",
});

interface ApplicationModalProps {
  isOpen: boolean;
  isEdit: boolean;
  selId: string;
  setIsOpen: () => void;
}

interface FieldGeneratorProps {
  children: Array<ReactElement>;
  width: string;
}

const FormFieldGenerator = ({ children, width = "" }: FieldGeneratorProps) => {
  return <ColumnBox width={width}>{children}</ColumnBox>;
};

function ApplicaionModal({ isOpen, isEdit, setIsOpen }: ApplicationModalProps) {
  const [application, setApplication] = useState<ApplicationInterface>({
    id: "",
    companyName: "",
    dateApplied: "",
    role: {
      id: "",
      name: "",
      url: "",
    },
    status: "",
    submittedResume: false,
    resumeViewed: false,
    contacted1stCall: false,
    techInterview: false,
    interview3: false,
    interview4: false,
    jobOffered: false,
  });

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
        <DialogContent id="modal-content">
          <DialogSubHeader>Basic Information</DialogSubHeader>
          <Stack direction="row" spacing={2} id="application-basic-info">
            <FormFieldGenerator width="33%">
              <label>Company Name</label>
              <TextField type="text" variant="outlined" size="small" />
            </FormFieldGenerator>
            <FormFieldGenerator width="33%">
              <label>Date Applied</label>
              <TextField type="date" variant="outlined" size="small" />
            </FormFieldGenerator>
            <FormFieldGenerator width="33%">
              <label>Status</label>
              <FormControl size="small">
                <Select value={"none"}>
                  <MenuItem value="none">Please Select a Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="hold">On Hold</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </FormFieldGenerator>
          </Stack>
          <DialogSubHeader>Role Information</DialogSubHeader>
          <Stack direction="row" spacing={2} id="application-role-info">
            <FormFieldGenerator width="50%">
              <label>Role Name</label>
              <TextField type="text" variant="outlined" size="small" />
            </FormFieldGenerator>
            <FormFieldGenerator width="50%">
              <label>Job Description URL</label>
              <TextField type="text" variant="outlined" size="small" />
            </FormFieldGenerator>
          </Stack>
          <DialogSubHeader>Current Status Checks</DialogSubHeader>
          <Stack direction="row" spacing={2} id="application-role-info">
            <FormFieldGenerator width="14%">
              <label>Submitted Resume?</label>
              <Checkbox inputProps={{ "aria-label": "Submitted Resume?" }} />
            </FormFieldGenerator>
            <FormFieldGenerator width="14%">
              <label>Resume Reviewed?</label>
              <Checkbox inputProps={{ "aria-label": "Was Resume Reviewed?" }} />
            </FormFieldGenerator>
            <FormFieldGenerator width="14%">
              <label>Initial Call?</label>
              <Checkbox
                inputProps={{
                  "aria-label": "Did you receive an Initial Phone Call?",
                }}
              />
            </FormFieldGenerator>
            <FormFieldGenerator width="14%">
              <label>Tech Interview?</label>
              <Checkbox
                inputProps={{
                  "aria-label": "Did you do a Tech Interview?",
                }}
              />
            </FormFieldGenerator>
            <FormFieldGenerator width="14%">
              <label>3rd Interview?</label>
              <Checkbox
                inputProps={{
                  "aria-label": "Did you have a 3rd Interview?",
                }}
              />
            </FormFieldGenerator>
            <FormFieldGenerator width="14%">
              <label>4th Interview?</label>
              <Checkbox
                inputProps={{
                  "aria-label": "Did you have a 4rd Interview?",
                }}
              />
            </FormFieldGenerator>
            <FormFieldGenerator width="14%">
              <label>Job Offer?</label>
              <Checkbox
                inputProps={{
                  "aria-label": "Did you receive a Job Offer?",
                }}
              />
            </FormFieldGenerator>
          </Stack>
        </DialogContent>
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
