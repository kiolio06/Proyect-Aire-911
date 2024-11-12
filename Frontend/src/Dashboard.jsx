import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function Dashboard() {
  const [data, setData] = useState([]);

  // Realiza la solicitud a la API de FastAPI
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/progress");  // Asegúrate de que FastAPI esté ejecutándose aquí
        setData(response.data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome back, User!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Today's Activities</CardTitle>
            <CardDescription>Personalized suggestions based on your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>15-minute creativity boost exercise</li>
              <li>Emotional intelligence reflection</li>
              <li>5-minute mindfulness meditation</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <p className="text-center text-lg mb-4">
            "The mind is everything. What you think you become." - Buddha
          </p>
          <Button className="w-full text-lg py-6">Start Today's Session</Button>
        </CardContent>
      </Card>
    </div>
  );
}