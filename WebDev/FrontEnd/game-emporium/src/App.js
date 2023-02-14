import {Routes, Route} from 'react-router-dom';
import { Layout } from 'antd';

import MainPageContainer from './Pages/MainPage/MainPageContainer';
import MainNavigation from './Pages/MainPage/Components/Navigation';
import FooterMain from './Pages/MainPage/Components/Footer';

import LinkGridContainer from '../src/Pages/LinkGridPage/LinkGridContainer';
import BreakoutMain from '../src/Pages/BreakoutPage/BreakoutMainContainer';

import './App.css';

const {Content} = Layout;

function App() {
  return (
    <MainPageContainer>
      <MainNavigation />
      <Content style={{ padding: '50px' }}>
        <div className="site-layout-content">
          <Routes>
              <Route path='/home' element={<LinkGridContainer />} />
              <Route path='/breakout' element={<BreakoutMain />} />
          </Routes>
        </div>
      </Content>
      <FooterMain />
    </MainPageContainer>
  );
}

export default App;
