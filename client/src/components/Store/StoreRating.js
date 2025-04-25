import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './StoreRating.css'; // Import the CSS file

const StoreRating = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);

  // Get the JWT token from localStorage (or another method if needed)
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the token in the Authorization header
      await axios.post(
        `http://localhost:5000/api/stores/${id}/rate`, 
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Rating submitted');
    } catch (err) {
      console.error('Error submitting rating:', err);
      alert('Failed to submit rating.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="store-rating-form">
      <label>Rate this store (1-5):</label>
      <input
        type='number'
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min='1'
        max='5'
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default StoreRating;
