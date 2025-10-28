import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './assets/css/style.css';
import './assets/css/catalago.css';
import './assets/css/footer.css';
import './assets/css/legal-pages.css';
import './assets/css/header.css';
import './assets/css/login.css';
import './assets/css/valores.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);