import { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';  // Assuming you want to style the profile with a CSS file

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,  // Assuming you're storing the token in localStorage
      }
    })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  return profile ? (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Joined on:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
        {/* You can add more fields like phone number, address, etc. */}
      </div>
      
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Profile;
