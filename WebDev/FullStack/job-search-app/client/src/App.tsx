import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { Container, Stack, Box, Card, CardContent } from "@mui/material";
import { deepPurple, grey, indigo, lightBlue } from "@mui/material/colors";
import ApplicationTable from "./components/ApplicationsTable";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false}>
        <Stack>
          <Box
            sx={{
              backgroundColor: deepPurple[100],
              fontColor: grey[900],
              paddingX: "20px",
              borderRadius: "10px 10px 0 0",
              marginTop: "10px",
            }}
          >
            <h1>The Job Search App!</h1>
            <h2>A 1-Stop Shop to Manage your Apps!</h2>
          </Box>
          <Box
            sx={{
              backgroundColor: lightBlue[100],
              fontColor: grey[900],
              paddingX: "20px",
              paddingY: "10px",
              borderTop: "1px solid #757575",
            }}
          >
            <h3>Your Current Applications:</h3>
            <Box
              sx={{
                height: "25em",
                backgroundColor: indigo[200],
                borderRadius: "5px",
              }}
            >
              <ApplicationTable />
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
}

export default App;
