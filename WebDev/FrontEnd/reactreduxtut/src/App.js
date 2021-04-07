import './App.css';
import  {Provider} from 'react-redux';

import Posts from './components/post';
import PostForm from './components/postForm';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App"> 
        <PostForm />
        <hr />
        <Posts />
      </div>
    </Provider>
  );
}

export default App;
