import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button, Text } from '@nextui-org/react';
    import logger from '../utils/logger';

    const NavbarComponent = () => {
      logger.info('Navbar component rendered');
      return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          <div>
            <Text b color="inherit">
              Flow
            </Text>
          </div>
          <div>
            <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
            <Link to="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
            <Button auto flat>
              Logout
            </Button>
          </div>
        </nav>
      );
    };

    export default NavbarComponent;
