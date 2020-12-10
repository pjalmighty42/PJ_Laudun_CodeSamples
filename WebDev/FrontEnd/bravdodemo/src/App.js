import React, {Fragment, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';

import { Layout } from 'antd';

import './App.css';

import NavBar from './Containers/NavBar';
import BodyMain from './Containers/BodyMain';
import PageFooter from './Containers/PageFooter';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Layout>
          <NavBar />
          <BodyMain />
          <PageFooter />
        </Layout>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
