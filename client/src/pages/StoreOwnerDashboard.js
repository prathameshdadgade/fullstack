import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './StoreOwnerDashboard.css';

const StoreOwnerDashboard = () => {
  const [store, setStore] = useState(null);
  const [users, setUsers] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user?.role !== 'storeOwner') {
      navigate('/');
    }

    const fetchStoreData = async () => {
      try {
        const storeRes = await axios.get(`/api/store/${user.storeId}`);
        const usersRes = await axios.get(`/api/store/${user.storeId}/ratings`);
        
        setStore(storeRes.data);
        setUsers(usersRes.data);

        const totalRating = storeRes.data.ratings.reduce((acc, rating) => acc + rating.rating, 0);
        setAverageRating(totalRating / storeRes.data.ratings.length);
      } catch (err) {
        console.error('Failed to load store data:', err);
      }
    };

    fetchStoreData();
  }, [user, navigate]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.toLowerCase() });
  };

  const filteredUsers = users.filter((user) =>
    Object.entries(filters).every(([key, value]) =>
      user[key]?.toLowerCase().includes(value)
    )
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="store-owner-dashboard">
      <h1>Store Owner Dashboard</h1>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <div className="store-info">
        <h2>Store Information</h2>
        <p><strong>Store Name:</strong> {store?.name}</p>
        <p><strong>Store Address:</strong> {store?.address}</p>
        <p><strong>Average Rating:</strong> {averageRating.toFixed(2)}</p>
      </div>

      <div className="filters">
        <input name="name" placeholder="Filter by User Name" onChange={handleFilterChange} />
        <input name="email" placeholder="Filter by User Email" onChange={handleFilterChange} />
      </div>

      <div className="table-container">
        <h2>Users Who Rated Your Store</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;










