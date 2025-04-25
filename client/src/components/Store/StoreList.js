import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './StoreList.css'; // import the CSS file

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stores')
      .then((res) => setStores(res.data))
      .catch((err) => console.error('Error fetching stores:', err));
  }, []);

  return (
    <div className="store-list-wrapper">
      <h1 className="store-list-title">Nearby Stores</h1>
      <div className="store-list-container">
        {stores.map((store) => (
          <div key={store._id} className="store-card">
            <div className="store-card-content">
              <h2>{store.name}</h2>
              <p>{store.address}</p>
              <Link to={`/stores/${store._id}/rate`} className="rate-btn">Rate</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
