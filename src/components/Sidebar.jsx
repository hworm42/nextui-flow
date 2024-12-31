import React from 'react';
import { Card, Text } from '@nextui-org/react';

const Sidebar = () => {
  return (
    <div style={{ width: '300px', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderLeft: '1px solid rgba(255, 255, 255, 0.2)', height: '100vh' }}>
      <Card>
        <Card.Body>
          <Text>Sidebar content goes here.</Text>
        </Card.Body>
      </Card>
      {/* Add more sidebar items here */}
    </div>
  );
};

export default Sidebar;
