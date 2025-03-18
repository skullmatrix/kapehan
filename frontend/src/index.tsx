import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/menu.css'; // Keep your CSS import

// Make sure the element exists before rendering
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  console.error("Root element not found!");
}