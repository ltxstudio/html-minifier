import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import your App component
import './index.css';  // Make sure to import Tailwind CSS here if you have global styles

// Rendering the App component into the root div in your HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
