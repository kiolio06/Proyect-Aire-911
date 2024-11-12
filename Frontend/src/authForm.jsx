import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); // Estado para mensajes de éxito o error

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name: e.target["register-name"].value,  // Cambié "nombre" por "name"
      email: e.target[type === "register" ? "register-email" : "email"].value,
      password: e.target[type === "register" ? "register-password" : "password"].value,
    };

    // Si estás usando confirmación de contraseña, verifica que ambas coincidan
    if (type === "register") {
      const confirmPassword = e.target["register-confirm-password"].value;
      if (formData.password !== confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.detail);
      } else {
        const data = await response.json();
        setMessage("Registro exitoso: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      setMessage("Hubo un problema con la solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
          <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Bienvenido a MindTrain</CardTitle>
              <CardDescription>Entrena tu mente, transforma tu vida</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
                <div className="text-sm text-center text-gray-500">
                  <a href="#" className="hover:text-gray-800">¿Olvidaste tu contraseña?</a>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Crear Cuenta</CardTitle>
              <CardDescription>Únete a MindTrain hoy</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nombre completo</Label>
                  <Input id="register-name" type="text" placeholder="Juan Pérez" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" placeholder="correo@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Contraseña</Label>
                  <Input id="register-password" type="password" placeholder="••••••••" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirmar contraseña</Label>
                  <Input id="register-confirm-password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isLoading}>
                  {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {message && <div className="text-center text-red-500 mt-4">{message}</div>} {/* Mensaje de estado */}
    </div>
  );
}