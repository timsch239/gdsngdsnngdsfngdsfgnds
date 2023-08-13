import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { CommissionsContextProvider } from './context/CommissionContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CommissionsContextProvider>
        <App />
      </CommissionsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);