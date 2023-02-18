import React, { useState, useCallback } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Checkbox,
  ButtonGroup,
  Button,
} from "@mui/material";
import { EditTwoTone, DeleteTwoTone } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { orange, amber, deepOrange, red } from "@mui/material/colors";
import ApplicaionModal from "./ApplicationModal";
import DeleteDialog from "./DeleteDialog";
import ApplicationInterface from "../interfaces/ApplicationInterfaces";

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

const DateSorter = (dateA: string, dateB: string) => {
  const date1 = new Date(dateA).setTime(0);
  const date2 = new Date(dateB).setTime(0);

  return date1 - date2;
};

//TODO: Remove this, this is just to base line test features
const tempData: ApplicationInterface[] = [
  {
    id: "app0",
    companyName: "Test Company",
    dateApplied: "2-14-2023",
    role: {
      id: "app0",
      name: "Test Role",
      url: "http://www.example.com",
    },
    status: "active",
    submittedResume: true,
    resumeViewed: false,
    contacted1stCall: false,
    techInterview: false,
    interview3: false,
    interview4: false,
    jobOffered: false,
  },
  {
    id: "app1",
    companyName: "Test Company",
    dateApplied: "2-14-2023",
    role: {
      id: "app1",
      name: "Test Role",
      url: "http://www.example.com",
    },
    status: "hold",
    submittedResume: true,
    resumeViewed: true,
    contacted1stCall: false,
    techInterview: false,
    interview3: false,
    interview4: false,
    jobOffered: false,
  },
  {
    id: "app2",
    companyName: "Test Company",
    dateApplied: "2-14-2023",
    role: {
      id: "app2",
      name: "Test Role",
      url: "http://www.example.com",
    },
    status: "rejected",
    submittedResume: false,
    resumeViewed: false,
    contacted1stCall: false,
    techInterview: false,
    interview3: false,
    interview4: false,
    jobOffered: false,
  },
];

const emptyApplication = (): ApplicationInterface => ({
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

function ApplicationTable() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [data, setData] = useState<ApplicationInterface[]>(tempData);
  const [savedData, setSavedData] =
    useState<ApplicationInterface>(emptyApplication);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell width="15%">Company Name</TableCell>
              <TableCell width="12%">Date Applied</TableCell>
              <TableCell width="15%">Role</TableCell>
              <TableCell width="7%">Status</TableCell>
              <TableCell width="6%">Resume Submitted?</TableCell>
              <TableCell width="6%">Resume Viewed?</TableCell>
              <TableCell width="6%">Intro Call?</TableCell>
              <TableCell width="6%">Tech Interview?</TableCell>
              <TableCell width="6%">3rd Interview?</TableCell>
              <TableCell width="6%">4th Interview?</TableCell>
              <TableCell width="6%">Job Offer?</TableCell>
              <TableCell width="10%">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
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
                    <EditButton>
                      <EditTwoTone
                        onClick={() => {
                          setModalType("edit");
                          handleOpen();
                        }}
                      />
                    </EditButton>
                    <DeleteButton>
                      <DeleteTwoTone
                        onClick={() => {
                          setModalType("delete");
                          handleOpen();
                        }}
                      />
                    </DeleteButton>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ApplicationTable;
