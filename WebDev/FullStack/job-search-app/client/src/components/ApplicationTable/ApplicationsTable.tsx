import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { GET_APPLICATIONS } from "../../queries/clientQueries";
import ApplicationTableRow from "./ApplicationTableRow";

const DateSorter = (dateA: string, dateB: string) => {
  const date1 = new Date(dateA).setTime(0);
  const date2 = new Date(dateB).setTime(0);

  return date1 - date2;
};

function ApplicationTable() {
  const { loading, error, data } = useQuery(GET_APPLICATIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {!loading && !error && (
        <Paper style={{ height: "100%", width: "100%" }}>
          <TableContainer>
            <Table aria-label="Current Job Applications Table">
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
                <ApplicationTableRow data={data.getApps} />
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}

export default ApplicationTable;
