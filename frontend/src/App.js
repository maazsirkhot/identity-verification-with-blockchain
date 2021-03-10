import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AOS from 'aos';
import store from './store.js';
import Routes from './components/Routes';
import './assets/css/custom.css';
import './assets/css/aos.css';
import './assets/css/venobox.min.css';

AOS.init();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
