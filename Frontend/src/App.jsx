<<<<<<< HEAD
'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";


export default function AuthForm() { // Cambiar el nombre del componente aquí
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './authForm';
// import InsightsSections from './InsightsSection'; Probando el apartado de InsightsSections !!!!!
>>>>>>> c5bd8badb3e842313d91a25b2830ae86bdf63cb7

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
