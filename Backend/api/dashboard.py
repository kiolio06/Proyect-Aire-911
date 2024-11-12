from fastapi import APIRouter

# Define el router
router = APIRouter()

# Datos de ejemplo para el progreso semanal con detalles adicionales
@router.get("/progress")
async def get_weekly_progress():
    data = [
        {"name": "Mon", "score": 1, "session_duration": 15, "activity": "Mindfulness"},
        {"name": "Tue", "score": 2, "session_duration": 10, "activity": "Creativity Boost"},
        {"name": "Wed", "score": 3, "session_duration": 20, "activity": "Visualization"},
        {"name": "Thu", "score": 4, "session_duration": 15, "activity": "Meditation"},
        {"name": "Fri", "score": 5, "session_duration": 25, "activity": "Emotional Intelligence"},
        {"name": "Sat", "score": 6, "session_duration": 30, "activity": "Self-reflection"},
        {"name": "Sun", "score": 7, "session_duration": 20, "activity": "Relaxation"},
    ]
    return data
