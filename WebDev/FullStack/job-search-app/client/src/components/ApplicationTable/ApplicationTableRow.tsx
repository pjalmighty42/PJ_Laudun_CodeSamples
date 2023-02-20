import React, { useState } from "react";

import {
  TableCell,
  TableRow,
  Link,
  Checkbox,
  ButtonGroup,
  Button,
} from "@mui/material";
import { EditTwoTone, DeleteTwoTone } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { orange, amber, deepOrange, red } from "@mui/material/colors";
import ApplicationInterface from "../../interfaces/ApplicationInterfaces";

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
            <Checkbox disabled checked={row.submittedResume} />
          </TableCell>
          <TableCell>
            <Checkbox disabled checked={row.resumeViewed} />
          </TableCell>
          <TableCell>
            <Checkbox disabled checked={row.contacted1stCall} />
          </TableCell>
          <TableCell>
            <Checkbox disabled checked={row.techInterview} />
          </TableCell>
          <TableCell>
            <Checkbox disabled checked={row.interview3} />
          </TableCell>
          <TableCell>
            <Checkbox disabled checked={row.interview4} />
          </TableCell>
          <TableCell>
            <Checkbox disabled checked={row.jobOffered} />
          </TableCell>
          <TableCell>
            <ButtonGroup variant="text">
              <EditButton onClick={() => isEditHandler(row.id)}>
                <EditTwoTone />
              </EditButton>
              <DeleteButton onClick={() => deleteDialogHandler(row.id)}>
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
    </>
  );
}

export default ApplicationTableRow;
