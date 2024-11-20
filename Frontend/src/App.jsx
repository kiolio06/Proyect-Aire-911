import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './AuthForm'; // Ajusta la ruta según tu estructura de carpetas
import Dashboard from './Dashboard'; // Ajusta la ruta según tu estructura de carpetas
import Onboarding from './Onboarding'; // Ajusta la ruta según tu estructura de carpetas
import InsightsSection from './InsightsSection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/InsightsSections" element={<InsightsSection/>} />

      </Routes>
    </Router>
  );
}

export default App;
