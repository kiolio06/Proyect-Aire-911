from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class Exercise(BaseModel):
    id: int
    name: str
    instructions: str
    benefits: str
    duration: int  # en minutos

class UserPreferences(BaseModel):
    exercise_type: Optional[str]
    duration: Optional[int]  # en minutos
    frequency: Optional[int]  # veces por semana

class ExerciseHistory(BaseModel):
    exercise_id: int
    completed_at: datetime

class User(BaseModel):
    id: int
    preferences: UserPreferences
    history: List[ExerciseHistory] = []
