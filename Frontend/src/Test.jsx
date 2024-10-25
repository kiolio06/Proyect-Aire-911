import { Card, CardContent } from "/@/components/ui/card"

export default function Component() {
  const imagenes = [
    { src: "/placeholder.svg?height=400&width=600", alt: "Imagen 1", titulo: "Naturaleza", descripcion: "Un hermoso paisaje natural" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Imagen 2", titulo: "Ciudad", descripcion: "Vista panorámica de una ciudad" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Imagen 3", titulo: "Playa", descripcion: "Arena dorada y mar azul" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Imagen 4", titulo: "Montañas", descripcion: "Picos nevados al amanecer" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Imagen 5", titulo: "Bosque", descripcion: "Denso bosque verde" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Imagen 6", titulo: "Desierto", descripcion: "Dunas de arena bajo el sol ardiente" },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Galería de Imágenes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imagenes.map((imagen, index) => (
          <Card key={index} className="overflow-hidden group">
            <div className="relative aspect-video">
              <img
                src={imagen.src}
                alt={imagen.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
                <CardContent className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-xl font-bold">{imagen.titulo}</h2>
                  <p className="mt-2">{imagen.descripcion}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
