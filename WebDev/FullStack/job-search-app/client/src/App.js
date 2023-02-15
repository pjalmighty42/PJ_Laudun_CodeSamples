import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { Container, Stack, Box, Card, CardContent } from "@mui/material";
import { deepPurple, grey, indigo, lightBlue } from "@mui/material/colors";

function App() {
  return (
    <>
      <CssBaseline />
      <Container fixed>
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
              borderTop: "1px solid #757575",
            }}
          >
            <h3>Your Current Applications:</h3>
            <Card>
              <CardContent></CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </>
  );
}

export default App;
