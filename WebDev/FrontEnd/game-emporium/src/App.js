import {Routes, Route} from 'react-router-dom';
import { Layout } from 'antd';

import MainPageContainer from './Pages/MainPage/MainPageContainer';
import MainNavigation from './Pages/MainPage/Components/Navigation';
import FooterMain from './Pages/MainPage/Components/Footer';

import LinkGridContainer from '../src/Pages/LinkGridPage/LinkGridContainer';

import './App.css';

const {Content} = Layout;

function App() {

  const linkListItemsArray = [
    {
      id: 'game01',
      title: 'Home',
      toLoc: 'home',
    },
    {
      id: 'game02',
      title: 'Breakout',
      toLoc: 'breakout',
    }
  ]

  return (
    <MainPageContainer>
      <MainNavigation links={linkListItemsArray}/>
      <Content>
          <Routes>
              <Route path='/' element={<LinkGridContainer linkListArray={linkListItemsArray}/>} />
              <Route path='/breakout' element={<LinkGridContainer linkListArray={linkListItemsArray}/>} />
          </Routes>
      </Content>
      <FooterMain />
    </MainPageContainer>
  );
}

export default App;
