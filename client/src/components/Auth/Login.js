import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './login.css';
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder='Password' type='password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
