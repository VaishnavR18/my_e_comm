import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';
import '@/styles/global.css';
import '@/styles/animations.css';
import '@/styles/product-card.css';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <Toaster />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);