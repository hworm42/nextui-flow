import React, { useEffect, useState } from 'react';
import { Card, Text, Button, Loading } from '@nextui-org/react';
import AdminService from '../services/AdminService.js';
import '../styles/formStyles.css';
import AdminSidebar from '../components/AdminSidebar.jsx';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await AdminService.getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await AdminService.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
        <Text h2>Admin Dashboard</Text>
        {loading ? (
          <Loading type="points" />
        ) : (
          <Card>
            <Card.Body>
              {users.length === 0 ? (
                <Text>No users available.</Text>
              ) : (
                users.map((user) => (
                  <div key={user.id} style={{ marginBottom: '1rem' }}>
                    <Text>{user.username} ({user.email}) - {user.role}</Text>
                    <Button onClick={() => handleDeleteUser(user.id)} color="error" size="sm">
                      Delete
                    </Button>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
