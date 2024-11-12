import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './AuthForm'; // Ajusta la ruta según tu estructura de carpetas
import Dashboard from './Dashboard'; // Ajusta la ruta según tu estructura de carpetas
import Onboarding from './Onboarding'; // Ajusta la ruta según tu estructura de carpetas

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/onboarding" element={<About />} />  {}
      </Routes>
    </Router>
  );
}

export default App;
