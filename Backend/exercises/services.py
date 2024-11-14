from exercises.models import Exercise
import openai


def get_personalized_recommendations(user, exercise_types=None, duration=None, frequency=None):
    try:
        # Verificar si el API key de OpenAI está disponible
        if not openai.api_key:
            raise ValueError("API Key de OpenAI no disponible. Usando recomendaciones simuladas.")
        
        # Construir el mensaje para enviar a OpenAI basado en los parámetros
        prompt = (
            f"Usuario {user.username} busca ejercicios personalizados. "
            f"Tipos de ejercicio: {exercise_types or 'generales'}, "
            f"duración: {duration or 'sin especificar'}, frecuencia: {frequency or 'sin especificar'}."
        )

        # Llamada a la API de OpenAI para obtener recomendaciones
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=100,
            temperature=0.5
        )
        
        # Procesar la respuesta de OpenAI
        recommendations = response.choices[0].text.strip()
        return [Exercise(id=i+1, name=rec, instructions="Sigue las instrucciones", benefits="Beneficio personal", duration=duration or 10)
                for i, rec in enumerate(recommendations.split('\n')) if rec]
    
    except Exception as e:
        print(f"Error al obtener recomendaciones personalizadas: {e}")
        
        # Recomendaciones de prueba en caso de error
        return [
            Exercise(id=1, name="Meditación", instructions="Relájate y respira", benefits="Reduce el estrés", duration=10),
            Exercise(id=2, name="Visualización", instructions="Imagina un objetivo logrado", benefits="Incrementa motivación", duration=5)
        ]




