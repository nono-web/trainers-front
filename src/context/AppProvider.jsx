import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [coach, setCoach] = useState(
    localStorage.getItem('coach')
      ? JSON.parse(localStorage.getItem('coach'))
      : null
  );
  
  useEffect(() => {
    if (coach) {
      localStorage.setItem('coach', JSON.stringify(coach));
    } else {
      localStorage.removeItem('coach');
    }
  }, [coach]);

  const AppStates = useMemo(
    () => ({
      coach,
      setCoach,
    }),
    [coach]
  );

  return (
    <AppContext.Provider value={AppStates}>{children}</AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

export default AppProvider;
