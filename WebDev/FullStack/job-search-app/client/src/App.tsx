import { useState } from "react";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { AddCircleOutlineTwoTone } from "@mui/icons-material";

import CssBaseline from "@mui/material/CssBaseline";
import { Container, Stack, Box, Button } from "@mui/material";
import { deepPurple, grey, indigo, lightBlue } from "@mui/material/colors";
import ApplicationTable from "./components/ApplicationTable/ApplicationsTable";

import ApplicationModal from "../src/components/TableActions/ApplicationModal";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [isNew, setIsNew] = useState(false);

  const openNewModal = () => {
    const currentNew = isNew;
    setIsNew(!currentNew);
  };

  return (
    <>
      <ApolloProvider client={client}>
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
                borderRadius: "0 0 10px 10px",
              }}
            >
              <h3>Your Current Applications:</h3>
              <Box
                sx={{
                  height: "25.5em",
                  backgroundColor: indigo[200],
                  borderRadius: "5px",
                }}
              >
                <ApplicationTable />
              </Box>
              <Box
                sx={{
                  height: "3em",
                  marginTop: ".5em",
                  marginBotton: ".5em",
                  alignItems: "right",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  color="success"
                  variant="contained"
                  onClick={openNewModal}
                >
                  <AddCircleOutlineTwoTone sx={{ marginRight: ".25em" }} />
                  {"Add Application"}
                </Button>
              </Box>
            </Box>
          </Stack>
        </Container>

        <ApplicationModal
          isOpen={isNew}
          isEdit={false}
          selId=""
          setIsOpen={openNewModal}
        />
      </ApolloProvider>
    </>
  );
}

export default App;
