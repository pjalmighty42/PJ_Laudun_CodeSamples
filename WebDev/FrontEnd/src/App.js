import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

import Layout from '../src/Containers/Layout/Layout';

function App() {
  return (
    <Container maxWidth="xl" className="App">
      <Layout>
      </Layout>
    </Container>
  );
}

export default App;
