import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import User from '../src/classes/user';

//User
///Site = store
///GET_USER_BYID = action
///LoginUser = Reducer

//Videos
///Site = store
///GET_VIDEO_LIST_BYRANGE = action
///GET_VIDEO_BYID = action
///GetVideoCarousel = Reducer
///PlayVideo = Reducer

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
