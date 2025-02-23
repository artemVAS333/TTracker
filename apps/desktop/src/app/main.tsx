import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// React Redux
import { Provider } from 'react-redux';
import store from '../state/store.ts';
// Styles
import '../assets/scss/index.scss';
import '../assets/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event: unknown, message: unknown) => console.log(message));
