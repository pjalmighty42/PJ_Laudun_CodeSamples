
import './App.css';
import { Layout } from "antd";
import { Routes, Route } from 'react-router-dom';
import HomePage  from './pages/HomePage';

import GameListMain from './pages/GameList/GameListMain';

const { Header, Footer } = Layout;

function App() {
  return (
    <Layout className="App">
      <Header className="App-header">
        <h1>PJ's Gameplay Emporium!</h1>
      </Header>
      <HomePage>
        <Routes>
          <Route path="/" exact element={<GameListMain/>} />
        </Routes>
      </HomePage>
      <Footer className="Footer">©2022 Paul Laudun.</Footer>
    </Layout>
  );
}

export default App;
