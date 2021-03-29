import React from 'react';
import { Provider } from 'react-redux';
import AOS from 'aos';
import store from './store.js';
import './assets/css/custom.css';
import './assets/css/aos.css';
import './assets/css/venobox.min.css';
import Routes from './components/Routes';

AOS.init();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
