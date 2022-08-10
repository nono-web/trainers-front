import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppProvider';

const Disconnect = () => {
  const { setCoach } = useApp();

  const logout = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/auth/logout`);
  };
  useEffect(() => {
    setCoach(null);
    logout();
  }, []);

  return <Navigate to="/" />;
};

export default Disconnect;