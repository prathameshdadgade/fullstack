import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <Link to='/'>Stores</Link>
      {user ? (
        <>
          <Link to='/me'>Profile</Link>
          {user.role === 'Admin' && <Link to='/admin'>Admin</Link>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </>
      )}
    </nav>
  );
};
export default Navbar;
