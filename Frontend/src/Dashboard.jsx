import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importa el ícono de usuario

export default function Dashboard() {
  const [data, setData] = useState([]);  // Datos de progreso
  const [preferences, setPreferences] = useState({ goals: [], sessionLength: '' });  // Preferencias
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para manejar la visibilidad del menú
  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario
  const navigate = useNavigate(); // Hook de navegación

  // Realiza la solicitud a la API de FastAPI
  useEffect(() => {
    // Obtener el nombre del usuario desde localStorage
    const name = localStorage.getItem("userName") || "Usuario"; // Valor por defecto si no existe
    setUserName(name); // Establece el nombre del usuario en el estado

    // Solicitar los datos de progreso
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/progress");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };
    fetchData();

    // Cargar preferencias desde localStorage
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    // Elimina el userName de localStorage al cerrar sesión
    localStorage.removeItem("userName");
    navigate('/'); // Redirige al login
  };

  // Función para manejar la apertura/cierre del menú
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Maneja el click del botón para redirigir a la página de Insights
  const handleStartSession = () => {
    navigate('/InsightsSections');
  };

  return (
    <div className="container mx-auto p-4">
      {/* Barra superior con el ícono de usuario */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1> {/* Mostrar el nombre del usuario */}
        
        {/* Botón de usuario con ícono en la parte superior derecha */}
        <div className="relative">
          <Button onClick={toggleDropdown} className="px-4 py-2 text-lg">
            <FaUserCircle className="text-2xl" /> {/* Ícono de usuario */}
          </Button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48">
              <ul>
                <li>
                  <Button 
                    onClick={handleLogout} 
                    className="w-full text-left px-4 py-2 text-sm"
                  >
                    Cerrar sesión
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta de progreso */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Weekly mental well-being score</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tarjeta de preferencias */}
        <Card>
          <CardHeader>
            <CardTitle>Your Preferences</CardTitle>
            <CardDescription>Selected goals and session length</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {preferences.goals.map(goal => <li key={goal}>{goal}</li>)}
              <li>Session Length: {preferences.sessionLength} minutes</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Card para iniciar la sesión */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <p className="text-center text-lg mb-4">
            "The mind is everything. What you think you become." - Buddha
          </p>
          <Button className="w-full text-lg py-6" onClick={handleStartSession}>Start Today's Session</Button>
        </CardContent>
      </Card>
    </div>
  );
}