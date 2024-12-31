import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App.jsx';
    import { NextUIProvider } from '@nextui-org/react';
    import { BrowserRouter } from 'react-router-dom';
    import logger from './utils/logger';

    logger.info('Application started');

    ReactDOM.render(
      <NextUIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NextUIProvider>,
      document.getElementById('root')
    );
