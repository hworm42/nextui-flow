import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App.jsx';
    import { NextUIProvider } from '@nextui-org/react';
    import { BrowserRouter } from 'react-router-dom';

    ReactDOM.render(
      <NextUIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NextUIProvider>,
      document.getElementById('root')
    );
