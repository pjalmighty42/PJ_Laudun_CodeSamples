import React, { useState } from "react";

import {
  TableCell,
  TableRow,
  Link,
  Checkbox,
  ButtonGroup,
  Button,
  TextField,
} from "@mui/material";
import { EditTwoTone, DeleteTwoTone } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { orange, amber, deepOrange, red } from "@mui/material/colors";
import { ApplicationInterface } from "../../interfaces/ApplicationInterfaces";

import ApplicationModal from "../TableActions/ApplicationModal";
import DeleteDialog from "../TableActions/DeleteDialog";

const EditButton = styled(Button)({
  color: orange[400],
  "&:hover": {
    color: orange[700],
    backgroundColor: amber[50],
  },
});

const DeleteButton = styled(Button)({
  color: red[400],
  "&:hover": {
    color: red[700],
    backgroundColor: deepOrange[50],
  },
});

interface ApplicationRowInterface {
  data: ApplicationInterface[];
}

function ApplicationTableRow({ data }: ApplicationRowInterface) {
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [appID, setAppID] = useState("");

  const deleteDialogHandler = (id?: string) => {
    const currIsDeleteOpen = openDeleteDialog;
    const passedID = id !== undefined ? id : "";
    setAppID(passedID);
    setOpenDeleteDialog(!currIsDeleteOpen);
  };

  const isEditHandler = (id?: string) => {
    const currIsEdit = isEdit;
    const passedID = id !== undefined ? id : "";
    setAppID(passedID);
    setIsEdit(!currIsEdit);
  };

  const toggleEditModal = () => {
    const currIsEdit = isEdit;
    setIsEdit(!currIsEdit);
  };

  return (
    <>
      {data.map((row: ApplicationInterface) => (
        <TableRow key={row.id}>
          <TableCell>{row.companyName}</TableCell>
          <TableCell>{row.dateApplied}</TableCell>
          <TableCell>
            <Link href={row.role.url} target="_blank" rel="noopener">
              {row.role.name}
            </Link>
          </TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell>
            <Checkbox
              disabled
              inputProps={{ "aria-label": "Submitted Resume?" }}
              checked={row.submittedResume}
            />
          </TableCell>
          <TableCell>
            <Checkbox
              disabled
              inputProps={{ "aria-label": "Was Resume Reviewed?" }}
              checked={row.resumeViewed}
            />
          </TableCell>
          <TableCell>
            <Checkbox
              disabled
              inputProps={{
                "aria-label": "Did you receive an Initial Phone Call?",
              }}
              checked={row.contacted1stCall}
            />
          </TableCell>
          <TableCell>
            <Checkbox
              disabled
              inputProps={{ "aria-label": "Did you do a Tech Interview?" }}
              checked={row.techInterview}
            />
          </TableCell>
          <TableCell>
            <Checkbox
              disabled
              inputProps={{ "aria-label": "Did you have a 3rd Interview?" }}
              checked={row.interview3}
            />
          </TableCell>
          <TableCell>
            <Checkbox
              disabled
              inputProps={{ "aria-label": "Did you have a 4th Interview?" }}
              checked={row.interview4}
            />
          </TableCell>
          <TableCell>
            <Checkbox
              disabled
              inputProps={{ "aria-label": "Did you receive a Job Offer?" }}
              checked={row.jobOffered}
            />
          </TableCell>
          <TableCell>
            <ButtonGroup variant="text">
              <EditButton
                onClick={() => isEditHandler(row.id)}
                aria-label="Edit Button"
              >
                <EditTwoTone />
              </EditButton>
              <DeleteButton
                onClick={() => deleteDialogHandler(row.id)}
                aria-label="Delete Button"
              >
                <DeleteTwoTone />
              </DeleteButton>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      ))}
      <DeleteDialog
        isOpen={openDeleteDialog}
        setIsOpen={deleteDialogHandler}
        id={appID}
      />
      <ApplicationModal
        isOpen={isEdit}
        isEdit={true}
        selId={appID}
        setIsOpen={toggleEditModal}
      />
    </>
  );
}

export default ApplicationTableRow;
