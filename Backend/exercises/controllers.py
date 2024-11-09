# controllers.py

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from exercises.models import Exercise  # Importa el modelo Exercise
from exercises.services import get_personalized_recommendations  # Importa la función desde services.py

router = APIRouter()

# Clase Pydantic para definir la estructura del usuario en los parámetros de consulta
class User(BaseModel):
    username: str
    exercise_history: Optional[List[dict]] = None

# Endpoint GET para obtener recomendaciones personalizadas
@router.get("/recommendations", response_model=List[Exercise])
async def get_recommendations(
    username: str,
    exercise_types: Optional[List[str]] = Query(None),
    duration: Optional[int] = Query(None),
    frequency: Optional[int] = Query(None)
):
    
    # Crear un objeto User simulado para el servicio
    user = User(username=username, exercise_history=[])
    recommendations = get_personalized_recommendations(user, exercise_types, duration, frequency)
    return recommendations

# Endpoint POST para marcar un ejercicio como completado
@router.post("/mark_completed/{exercise_id}")
async def mark_exercise_completed(username: str, exercise_id: int):

    # Crear un objeto User simulado y agregar el ejercicio al historial
    user = User(username=username, exercise_history=[])
    user.exercise_history.append({"exercise_id": exercise_id, "completed_at": datetime.now()})
    return {"message": "Exercise marked as completed"}




