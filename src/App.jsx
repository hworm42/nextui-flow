import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import HomePage from './pages/HomePage.jsx';
    import ExplorePage from './pages/ExplorePage.jsx';
    import NotificationsPage from './pages/NotificationsPage.jsx';
    import MessagesPage from './pages/MessagesPage.jsx';
    import ProfilePage from './pages/ProfilePage.jsx';
    import SettingsPage from './pages/SettingsPage.jsx';
    import SearchPage from './pages/SearchPage.jsx';
    import HelpPage from './pages/HelpPage.jsx';
    import Navbar from './components/Navbar.jsx';
    import Header from './components/Header.jsx';
    import Footer from './components/Footer.jsx';

    const App = () => {
      return (
        <div>
          <Header />
          <div style={{ display: 'flex' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '1rem' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/settings/account" element={<SettingsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/help" element={<HelpPage />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      );
    };

    export default App;
