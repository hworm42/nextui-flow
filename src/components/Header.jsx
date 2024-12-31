import React, { useState } from 'react';
    import { Switch, useTheme, Text, Button } from '@nextui-org/react';
    import { SunIcon, MoonIcon } from './Icons.jsx';

    const Header = () => {
      const { type, isDark } = useTheme();
      const [darkMode, setDarkMode] = useState(isDark);

      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.setAttribute('data-theme', darkMode ? 'light' : 'dark');
      };

      return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div>
            <Text h3>Twitter Clone</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
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
