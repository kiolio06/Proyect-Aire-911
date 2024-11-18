import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const insights = [
  { title: "Creativity Boost", description: "Try taking a different route to work today to stimulate new neural pathways." },
  { title: "Emotional Check-in", description: "Reflect on a challenging emotion you felt recently." },
  { title: "Mindfulness Moment", description: "Take three deep breaths and focus on the present moment whenever you feel stressed." },
];

const drawingActivity = {
  title: "Dibujo Intuitivo",
  description: "Expresar visualmente tus emociones y experiencias meditativas.",
  steps: [
    "Con papel y lápices de colores, comienza a dibujar lo que surgió durante tu meditación.",
    "No te fijes en la perfección; simplemente deja que tu mano se mueva libremente.",
    "El dibujo puede reflejar tus estados de ánimo, imágenes o sensaciones.",
  ],
};

const emotionalActivity = {
  title: "Diario de emociones",
  description: "Dedica unos minutos cada día para escribir sobre tus emociones.",
  steps: [
    "Elige un momento tranquilo para reflexionar.",
    "Anota la fecha y escribe sobre las emociones que has sentido durante el día.",
    "Describe qué situaciones o interacciones provocaron esas emociones y cómo respondiste.",
    "Revisa tus entradas periódicamente para identificar patrones.",
  ],
};

const perspectiveActivity = {
  title: "Cambio de perspectiva",
  description: "Ver un problema o idea desde diferentes ángulos.",
  steps: [
    "Toma un problema específico que estés enfrentando y escríbelo en el centro de una hoja.",
    "Pregúntate cómo lo verían diferentes personas (un niño, un anciano, un artista, un científico, etc.).",
    "Anota las respuestas y observa si alguna de ellas te inspira una nueva solución o idea.",
  ],
};

export default function InsightsSection() {
  const [activeInsight, setActiveInsight] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleActivitySelect = (activity) => {
    if (selectedActivity === activity) {
      // Si la actividad seleccionada es la misma, ciérrala
      setShowModal(false);
      setSelectedActivity(null);
      setCurrentStep(0);
    } else {
      // Selecciona una nueva actividad
      setSelectedActivity(activity);
      setShowModal(true);
      setCurrentStep(0);
      setFadeIn(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFadeIn(false);
    setSelectedActivity(null);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < selectedActivity.steps.length - 1) {
      setFadeIn(false);
      setCurrentStep(currentStep + 1);
      setTimeout(() => setFadeIn(true), 100);
    }
  };

  const renderActivityButton = (activity, title) => (
    <button
      onClick={() => handleActivitySelect(activity)}
      className="mt-2 block w-full text-center bg-blue-600 text-white px-4 py-2 rounded transition hover:bg-blue-500"
    >
      {title}
    </button>
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Daily Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="transition-transform transform hover:scale-105">
            <CardHeader>
              <CardTitle
                onClick={() => {
                  if (activeInsight === insight.title) {
                    setActiveInsight(null); // Cierra el insight si se vuelve a presionar
                  } else {
                    setActiveInsight(insight.title);
                  }
                }}
                className="cursor-pointer text-lg font-semibold text-gray-800"
              >
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mostrar actividades basadas en la selección del insight */}
      {activeInsight === "Mindfulness Moment" && (
        <div className="mt-4 border p-4 rounded bg-gray-100 shadow-lg">
          <h3 className="text-lg font-bold">Selecciona una actividad:</h3>
          {renderActivityButton(drawingActivity, "Dibujo Intuitivo")}
        </div>
      )}
      {activeInsight === "Emotional Check-in" && (
        <div className="mt-4 border p-4 rounded bg-gray-100 shadow-lg">
          <h3 className="text-lg font-bold">Selecciona una actividad:</h3>
          {renderActivityButton(emotionalActivity, "Diario de emociones")}
        </div>
      )}
      {activeInsight === "Creativity Boost" && (
        <div className="mt-4 border p-4 rounded bg-gray-100 shadow-lg">
          <h3 className="text-lg font-bold">Selecciona una actividad:</h3>
          {renderActivityButton(perspectiveActivity, "Cambio de perspectiva")}
        </div>
      )}

      {/* Modal para la actividad seleccionada */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600">
              X
            </button>
            <h3 className="text-xl font-bold mb-2">{selectedActivity.title}</h3>
            <p className="mb-4">{selectedActivity.description}</p>
            <h4 className="font-bold">Cómo hacerlo:</h4>
            <p className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
              {selectedActivity.steps[currentStep]}
            </p>
            {currentStep < selectedActivity.steps.length - 1 && (
              <button onClick={nextStep} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded transition hover:bg-blue-500">
                Siguiente
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}