import React from 'react';
import Main from './components/maincomponents'
import './App.css'
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configurestore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
