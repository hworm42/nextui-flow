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
    import LoginPage from './pages/LoginPage.jsx';
    import RegisterPage from './pages/RegisterPage.jsx';
    import ProtectedRoute from './components/ProtectedRoute.jsx';

    const App = () => {
      return (
        <div>
          <Header />
          <div style={{ display: 'flex' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '1rem' }}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/explore"
                  element={
                    <ProtectedRoute>
                      <ExplorePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <ProtectedRoute>
                      <MessagesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/:username"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings/account"
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <SearchPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/help"
                  element={
                    <ProtectedRoute>
                      <HelpPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      );
    };

    export default App;
