import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Feed from './components/Feed.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import TweetService from './services/TweetService.js';
import logger from './utils/logger.js';

const App = ({ toggleTheme }) => {
  const [tweets, setTweets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const data = await TweetService.getTweets();
        setTweets(data);
      } catch (error) {
        logger.error(`Error fetching tweets: ${error.message}`);
      }
    };

    fetchTweets();
  }, []);

  logger.debug('App component rendered');

  const shouldRenderNavbarAndSidebar = !['/', '/login', '/register'].includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        {shouldRenderNavbarAndSidebar && <Navbar toggleTheme={toggleTheme} />}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/feed" element={<Feed tweets={tweets} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {shouldRenderNavbarAndSidebar && <Sidebar />}
      </div>
    </div>
  );
};

export default App;
