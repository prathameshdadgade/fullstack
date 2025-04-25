import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }

    const fetchAdminData = async () => {
      try {
        const [userRes, storeRes, ratingRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/admin/stores'),
          axios.get('/api/admin/ratings'),
        ]);

        setUsers(userRes.data);
        setStores(storeRes.data);
        setRatings(ratingRes.data);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      }
    };

    fetchAdminData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      <section className="dashboard-section">
        <h2>All Users</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dashboard-section">
        <h2>All Stores</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Owner</th><th>Address</th></tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store._id}>
                <td>{store.name}</td>
                <td>{store.owner?.name || 'N/A'}</td>
                <td>{store.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dashboard-section">
        <h2>All Ratings</h2>
        <table>
          <thead>
            <tr><th>User</th><th>Store</th><th>Rating</th></tr>
          </thead>
          <tbody>
            {ratings.map(rating => (
              <tr key={rating._id}>
                <td>{rating.user?.name || 'N/A'}</td>
                <td>{rating.store?.name || 'N/A'}</td>
                <td>{rating.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
