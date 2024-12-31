import React from 'react';
    import { Text } from '@nextui-org/react';

    const Footer = () => {
      return (
        <footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Text>© 2023 Twitter Clone. All rights reserved.</Text>
        </footer>
      );
    };

    export default Footer;
