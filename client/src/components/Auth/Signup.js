import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './signup.css'; 
const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      login(res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err.response?.data?.message || err.message);
      if (err.response?.data?.message === 'Email already in use') {
        alert('This email is already registered. Please try again with a different email.');
      } else {
        alert('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input placeholder='Name' onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder='Password' type='password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input placeholder='Address' onChange={(e) => setForm({ ...form, address: e.target.value })} />
      
        <button type='submit'>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
