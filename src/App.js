import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartExercices from './components/CartExercices';
import CreateNewExercice from './components/CreateNewExercice';
import DetailsExercice from './components/DetailsExercice';
import Disconnect from './components/Disconnect';
import EditExercices from './components/EditExercices';
import ExercicesList from './components/ExercicesList';

import Home from './components/Home';
import Login from './components/Login';
import PageOutlet from './components/PageOutlet';
import ProfilCoach from './components/ProfilCoach';
import Register from './components/Register';
import AppProvider from './context/AppProvider';

const App = () => {
  return (
    <div className="App">
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/enregistrement" element={<Register />} />
            <Route path="/" element={<PageOutlet />}>
            <Route path="/disconnect" element={<Disconnect />} />
            <Route path="/exercices" element={<ExercicesList />} />
            <Route path="/createNew" element={<CreateNewExercice />} />
            <Route path="/exercices/:id" element={<DetailsExercice />} />
            <Route path="/exercices/:id/modifie" element={<EditExercices />} />
            <Route path="/panierExercices" element={<CartExercices />} />
            <Route path="/profil/:id" element={<ProfilCoach />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
};

export default App;
