import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

library.add(faFilm);


ReactDOM.render(
  <React.StrictMode>
    <Router>
     
        <App />
     
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


