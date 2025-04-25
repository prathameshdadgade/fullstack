import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import StoreList from './components/Store/StoreList';
import StoreRating from './components/Store/StoreRating';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import StoreDetails from './components/Store/StoreDetails';
import { useAuth } from './context/AuthContext';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
function App() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return (
      <>
         <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </>
    );
  }

  if (user?.role === 'storeOwner') {
    return (
      <>
        <Routes>
          <Route path="/storeowner" element={<StoreOwnerDashboard />} />
          <Route path="*" element={<Navigate to="/storeowner" />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* Routes for general users */}
        <Route path='/' element={<StoreList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/stores/:id/rate' element={<StoreRating />} />
        <Route path='/me' element={<Profile />} />
        <Route path="/stores/:id" element={<StoreDetails />} />
      </Routes>
    </>
  );
}

export default App;
