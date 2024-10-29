import { useState } from 'react'
import { Button } from "../@/components/ui/button"
import { Input } from "../@/components/ui/input"
import { Label } from "../@/components/ui/label"
import { Zap } from 'lucide-react'

export default function RegistroNeonMejorado() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos al servidor
    console.log("Nombre:", nombre)
    console.log("Email:", email)
    console.log("Password:", password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-black border-2 border-purple-500 rounded-lg p-8 shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse">
        <div className="flex justify-center mb-6">
          <Zap className="w-16 h-16 text-pink-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Registro Neón
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-pink-500">Nombre</Label>
            <Input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="bg-transparent border-2 border-purple-500 text-white focus:border-pink-500 focus:ring-pink-500 placeholder-gray-500 placeholder-opacity-50 transition-colors duration-300 p-3 rounded-md"
              placeholder="Tu nombre"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-pink-500">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border-2 border-purple-500 text-white focus:border-pink-500 focus:ring-pink-500 placeholder-gray-500 placeholder-opacity-50 transition-colors duration-300 p-3 rounded-md"
              placeholder="tu@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-pink-500">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent border-2 border-purple-500 text-white focus:border-pink-500 focus:ring-pink-500 placeholder-gray-500 placeholder-opacity-50 transition-colors duration-300 p-3 rounded-md"
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out shadow-[0_0_15px_rgba(236,72,153,0.5)]"
          >
            Registrarse
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors duration-300">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  )
}