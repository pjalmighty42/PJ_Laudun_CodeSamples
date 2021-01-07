import React, {useState} from 'react';
import { BrowserRouter } from 'react-router-dom';

import '../src/index.css';

import NavBar from './Containers/NavbarContainer';
import MainBodyContainer from './Containers/MainBodyContainer';
import FooterContainer from './Containers/FooterContainer';

function App() {

  const [phoneNumber, setPhoneNumber] = useState("111-222-3333");
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    {
      type:"twitter",
      url:"https://twitter.com"
    }, 
    {
      type:"linkedin",
      url:"https://www.linkedin.com"
    }, 
    {
      type:"facebook",
      url:"https://www.facebook.com"
    }, 
    {
      type:"mail",
      url:"/"
    }
  ]);

  return (
    <div className="App">
      <BrowserRouter>
          <NavBar />
          <MainBodyContainer />
          <FooterContainer 
            phoneNum={phoneNumber}
            socialMediaLinks={socialMediaLinks}
          />
      </BrowserRouter>
    </div>
  );
}

export default App;
