from pydantic import BaseModel
from bson import ObjectId  # Importar ObjectId para usarlo

# Esquema para la creación de usuario
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# Esquema para la respuesta del usuario
class UserResponse(BaseModel):
    id: str
    name: str
    email: str

    class Config:
        json_encoders = {
            ObjectId: str  # Convertir ObjectId a string en las respuestas
        }