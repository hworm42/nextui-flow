import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import HomePage from './pages/HomePage.jsx';
    import ProfilePage from './pages/ProfilePage.jsx';
    import Navbar from './components/Navbar.jsx';
    import logger from './utils/logger';

    const App = () => {
      logger.info('App component rendered');
      return (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      );
    };

    export default App;
