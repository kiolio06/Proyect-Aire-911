import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './authForm';
import About from './onboarding';

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