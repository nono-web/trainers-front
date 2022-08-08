import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrainingOrder from './components/TrainingOrder';
import CreateNewExercice from './components/CreateNewExercice';
import DetailsExercice from './components/DetailsExercice';
import Disconnect from './components/Disconnect';
import EditExercices from './components/EditExercices';
import ExercicesList from './components/ExercicesList';
import TrainingPlane from './components/TrainingPlane';

import Home from './components/Home';
import Login from './components/Login';
import PageOutlet from './components/PageOutlet';
import ProfilCoach from './components/ProfilCoach';
import Register from './components/Register';
import AppProvider from './context/AppProvider';
import TrainingPlaneDetails from './components/TrainingPlaneDetails';
import AdminRoute from './components/Admin/AdminRoute';

const App = () => {
  return (
    <div className="App">
      <AppProvider>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/disconnect" element={<Disconnect />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/enregistrement" element={<Register />} />
            <Route path="/" element={<PageOutlet />}>
              <Route path="/exercices" element={<ExercicesList />} />
              <Route path="/nouvelExercice" element={<CreateNewExercice />} />
              <Route path="/exercices/:id" element={<DetailsExercice />} />
              <Route
                path="/exercices/:id/modifie"
                element={<EditExercices />}
              />
              <Route path="/panierExercices/:id" element={<TrainingOrder />} />
              <Route path="/profil/:id" element={<ProfilCoach />} />
              <Route path="/entrainements/:coachId" element={<TrainingPlane />} />
              <Route path="/entrainements/details/:id" element={<TrainingPlaneDetails />} />
            </Route>
            <Route path="/" element={<AdminRoute />}>
              </Route>
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
};

export default App;
