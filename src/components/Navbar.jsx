import React from 'react';
    import { Link } from 'react-router-dom';
    import { Text } from '@nextui-org/react';

    const Navbar = () => {
      return (
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Link to="/" style={{ marginBottom: '1rem' }}>
            <Text>Home</Text>
          </Link>
          <Link to="/explore" style={{ marginBottom: '1rem' }}>
            <Text>Explore</Text>
          </Link>
          <Link to="/notifications" style={{ marginBottom: '1rem' }}>
            <Text>Notifications</Text>
          </Link>
          <Link to="/messages" style={{ marginBottom: '1rem' }}>
            <Text>Messages</Text>
          </Link>
          <Link to="/profile/username" style={{ marginBottom: '1rem' }}>
            <Text>Profile</Text>
          </Link>
          <Link to="/settings/account" style={{ marginBottom: '1rem' }}>
            <Text>Settings</Text>
          </Link>
          <Link to="/search" style={{ marginBottom: '1rem' }}>
            <Text>Search</Text>
          </Link>
          <Link to="/help" style={{ marginBottom: '1rem' }}>
            <Text>Help</Text>
          </Link>
        </nav>
      );
    };

    export default Navbar;
