import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './authForm';
// import InsightsSections from './InsightsSection'; Probando el apartado de InsightsSections !!!!!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/InsightsSections" element={<InsightsSections />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
