import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';  // <-- import this
import { CartProvider } from './contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- wrap here */}
      <CartProvider>
      <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
