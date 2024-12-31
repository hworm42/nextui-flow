import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Switch } from '@nextui-org/react';
import { SunIcon, MoonIcon } from './Icons.jsx';

const Navbar = ({ toggleTheme }) => {
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem('theme') === 'dark');

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };

  React.useEffect(() => {
    setDarkMode(localStorage.getItem('theme') === 'dark');
  }, [toggleTheme]);

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRight: '1px solid rgba(255, 255, 255, 0.2)', width: '200px', height: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Text h3>Twitter Clone</Text>
      </div>
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
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
        <Switch
          checked={darkMode}
          onChange={handleThemeChange}
          iconOn={<MoonIcon filled />}
          iconOff={<SunIcon filled />}
        />
      </div>
    </nav>
  );
};

export default Navbar;
