from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, validator
from typing import List, Literal

app = FastAPI()

# Definimos el modelo de datos de onboarding
class UserOnboarding(BaseModel):
    # Validación de metas: debe contener entre 1 y 3 elementos
    goals: List[Literal['Creativity', 'Emotional Intelligence', 'Inner Well-being', 'Imagination', 'Vision']] = Field(..., description="Debe seleccionar entre 1 y 3 metas")

    # Duración de la sesión: debe ser uno de los valores '10', '15', '20' o '30'
    session_length: Literal['10', '15', '20', '30'] = Field(..., description="Debe seleccionar una duración de sesión")
    
    @validator('session_length')
    def validate_session_length(cls, v):
        # Si el valor no está en la lista de opciones, lanzamos un error con el mensaje personalizado
        if v not in ['10', '15', '20', '30']:
            raise ValueError("Debe seleccionar una duración de sesión válida: '10', '15', '20' o '30'.")
        return v

@app.post("/onboarding/{user_id}")
async def save_onboarding(user_id: str, data: UserOnboarding):
    # Verificamos que los datos estén correctos
    if not data.goals:
        raise HTTPException(status_code=400, detail="Debe seleccionar al menos una meta.")
    
    if not data.session_length:
        raise HTTPException(status_code=400, detail="Debe seleccionar una duración de sesión.")
    
    return {"message": "Datos de onboarding guardados con éxito", "data": data}
