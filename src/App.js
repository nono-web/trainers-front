import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreationExercices from './components/CreationExercices';
import DetailsExercice from './components/DetailsExercice';
import EditExercices from './components/EditExercices';
import ExercicesList from './components/ExercicesList';

import Home from './components/Home';
import Login from './components/Login';
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
            <Route path="/exercices" element={<ExercicesList />} />
            <Route path="/creationExercices" element={<CreationExercices />} />
            <Route path="/exercices/:id" element={<DetailsExercice />} />
            <Route path="/exercices/:id/modifie" element={<EditExercices />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
};

export default App;
