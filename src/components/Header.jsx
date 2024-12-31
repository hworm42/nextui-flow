import React from 'react';
    import { Switch, Text, Button } from '@nextui-org/react';
    import { SunIcon, MoonIcon } from './Icons.jsx';
    import logger from '../utils/logger';

    const Header = ({ toggleTheme }) => {
      const [darkMode, setDarkMode] = React.useState(localStorage.getItem('theme') === 'dark');

      const handleThemeChange = () => {
        setDarkMode(!darkMode);
        toggleTheme();
        logger.debug('Theme toggled');
      };

      React.useEffect(() => {
        setDarkMode(localStorage.getItem('theme') === 'dark');
      }, [toggleTheme]);

      return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div>
            <Text h3>Twitter Clone</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              checked={darkMode}
              onChange={handleThemeChange}
              iconOn={<MoonIcon filled />}
              iconOff={<SunIcon filled />}
            />
            <Button auto flat>
              Logout
            </Button>
          </div>
        </header>
      );
    };

    export default Header;
