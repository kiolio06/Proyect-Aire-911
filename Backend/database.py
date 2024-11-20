import base64
import bcrypt
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from bson import ObjectId

# Conexión a MongoDB Atlas
uri = "mongodb+srv://rivejuan987:Juann9876@cluster0.wr8kl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true&tlsAllowInvalidCertificates=true"
client = AsyncIOMotorClient(uri)
db = client["DataUser"]
collection = db["DataRegister"]

# Esquema para la creación de usuario
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str

    class Config:
        json_encoders = {
            ObjectId: str  # Convertir ObjectId a string en las respuestas
        }

async def hash_password(plain_password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(plain_password.encode("utf-8"), salt)
    return base64.b64encode(hashed_password).decode("utf-8")

# Función para verificar la contraseña
async def verify_password(plain_password: str, hashed_password: str) -> bool:
    hashed_password_bytes = base64.b64decode(hashed_password)
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password_bytes)