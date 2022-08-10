import axios from 'axios';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [exercicesList, setExercicesList] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [orderTrainingPlane, setOrderTrainingPlane] = useState(
    localStorage.getItem('orderTrainingPlane')
      ? JSON.parse(localStorage.getItem('orderTrainingPlane'))
      : []
  );

  const [coach, setCoach] = useState(
    localStorage.getItem('coach')
      ? JSON.parse(localStorage.getItem('coach'))
      : {}
  );
  const [favoritesExercicesList, setfavoritesExercicesList] = useState(
    localStorage.getItem('favoritesExercicesList')
      ? JSON.parse(localStorage.getItem('favoritesExercicesList'))
      : []
  );

  useEffect(() => {
    if (favoritesExercicesList) {
      localStorage.setItem(
        'favoritesExercicesList',
        JSON.stringify(favoritesExercicesList)
      );
    } else {
      localStorage.removeItem('favoritesExercicesList');
    }
  }, [favoritesExercicesList]);

  useEffect(() => {
    if (coach) {
      localStorage.setItem('coach', JSON.stringify(coach));
    } else {
      localStorage.removeItem('coach');
    }
  }, [coach]);

  useEffect(() => {
    if (orderTrainingPlane) {
      localStorage.setItem(
        'orderTrainingPlane',
        JSON.stringify(orderTrainingPlane)
      );
    } else {
      localStorage.removeItem('orderTrainingPlane');
    }

    const getAllExercices = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/exercice');
        setExercicesList(res.data);
      } catch (err) {}
    };
    getAllExercices();
  }, [orderTrainingPlane]);

  const AppStates = useMemo(
    () => ({
      coach,
      setCoach,
      orderTrainingPlane,
      setOrderTrainingPlane,
      favoritesExercicesList,
      setfavoritesExercicesList,
      exercicesList,
      setExercicesList,
      showFavorites,
      setShowFavorites,
    }),
    [
      coach,
      favoritesExercicesList,
      orderTrainingPlane,
      exercicesList,
      showFavorites,
    ]
  );

  return (
    <AppContext.Provider value={AppStates}>{children}</AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

export default AppProvider;
