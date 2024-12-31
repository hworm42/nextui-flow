import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import MessagesPage from './pages/MessagesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import HelpPage from './pages/HelpPage.jsx';
import Footer from './components/Footer.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import logger from './utils/logger';
import Navbar from './components/Navbar.jsx';
import Feed from './components/Feed.jsx';
import Sidebar from './components/Sidebar.jsx';
import TweetService from './services/TweetService.js';

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
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/feed" element={<ProtectedRoute><Feed tweets={tweets} /></ProtectedRoute>} />
            <Route path="/explore" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
            <Route path="/profile/:username" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {shouldRenderNavbarAndSidebar && <Sidebar />}
      </div>
      <Footer />
    </div>
  );
};

export default App;
