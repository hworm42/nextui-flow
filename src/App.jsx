import React, { useEffect, useState } from 'react';
    import { Routes, Route } from 'react-router-dom';
    import HomePage from './pages/HomePage.jsx';
    import ExplorePage from './pages/ExplorePage.jsx';
    import NotificationsPage from './pages/NotificationsPage.jsx';
    import MessagesPage from './pages/MessagesPage.jsx';
    import ProfilePage from './pages/ProfilePage.jsx';
    import SettingsPage from './pages/SettingsPage.jsx';
    import SearchPage from './pages/SearchPage.jsx';
    import HelpPage from './pages/HelpPage.jsx';
    import Header from './components/Header.jsx';
    import Footer from './components/Footer.jsx';
    import LoginPage from './pages/LoginPage.jsx';
    import RegisterPage from './pages/RegisterPage.jsx';
    import ProtectedRoute from './components/ProtectedRoute.jsx';
    import logger from './utils/logger';
    import Navbar from './components/Navbar.jsx';
    import Feed from './components/Feed.jsx';
    import Sidebar from './components/Sidebar.jsx';

    const App = () => {
      const [tweets, setTweets] = useState([]);

      useEffect(() => {
        const fetchTweets = async () => {
          try {
            const response = await fetch('/tweets');
            const data = await response.json();
            setTweets(data.data);
          } catch (error) {
            logger.error(`Error fetching tweets: ${error.message}`);
          }
        };

        fetchTweets();
      }, []);

      logger.debug('App component rendered');

      return (
        <div>
          <Header />
          <div style={{ display: 'flex' }}>
            <Navbar />
            <main style={{ flex: 1, display: 'flex' }}>
              <Feed tweets={tweets} />
              <Sidebar />
            </main>
          </div>
          <Footer />
        </div>
      );
    };

    export default App;
