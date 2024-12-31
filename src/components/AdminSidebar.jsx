import React from 'react';
import { Text, Link } from '@nextui-org/react';

const AdminSidebar = () => {
  return (
    <div style={{ width: '200px', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRight: '1px solid rgba(255, 255, 255, 0.2)', height: '100vh' }}>
      <Text h3>Admin Menu</Text>
      <Link href="/admin" style={{ marginBottom: '1rem', display: 'block' }}>
        <Text>Dashboard</Text>
      </Link>
      <Link href="/admin/users" style={{ marginBottom: '1rem', display: 'block' }}>
        <Text>Users</Text>
      </Link>
      <Link href="/admin/settings" style={{ marginBottom: '1rem', display: 'block' }}>
        <Text>Settings</Text>
      </Link>
      {/* Add more admin menu items here */}
    </div>
  );
};

export default AdminSidebar;
