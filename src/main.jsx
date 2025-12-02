// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material'; // Для нормализации стилей MUI
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* CssBaseline должен быть внутри ThemeProvider, но для App проще здесь */}
      <CssBaseline /> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);