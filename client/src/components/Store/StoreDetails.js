import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './StoreDetails.css'; // Import the CSS file

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/stores/${id}`)
      .then((res) => setStore(res.data))
      .catch((err) => {
        console.error('Error fetching store details:', err);
        alert('Failed to load store details');
      });
  }, [id]);

  if (!store) return <p>Loading store details...</p>;

  return (
    <div className="store-details-container">
      <h2>{store.name}</h2>
      <p><strong>Address:</strong> {store.address}</p>
      <p><strong>Description:</strong> {store.description}</p>
      <p><strong>Average Rating:</strong> {store.avgRating || 'Not rated yet'}</p>
    </div>
  );
};

export default StoreDetails;