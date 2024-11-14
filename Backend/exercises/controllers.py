from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from exercises.models import Exercise
from exercises.services import get_personalized_recommendations

router = APIRouter()

class UserInput(BaseModel):
    username: str

@router.get("/recommendations", response_model=List[Exercise])
async def get_recommendations(
    username: str,
    exercise_types: Optional[List[str]] = Query(None),
    duration: Optional[int] = Query(None),
    frequency: Optional[int] = Query(None)
):
    # Crear un objeto User simulado para el servicio
    user = UserInput(username=username)
    
    # Llamar a la función de la IA con los datos recibidos del usuario
    recommendations = get_personalized_recommendations(user, exercise_types, duration, frequency)
    
    return recommendations

@router.post("/mark_completed/{exercise_id}")
async def mark_exercise_completed(username: str, exercise_id: int):
    # Aquí podrías agregar lógica adicional para registrar el ejercicio como completado en la base de datos
    return {"message": f"Exercise {exercise_id} marked as completed for user {username}"}





