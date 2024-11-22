from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo.errors import ConnectionFailure
from database import client, collection, hash_password, verify_password
from schemas import UserCreate, UserResponse
from schemas import UserLogin


# Inicializar la aplicación de FastAPI
app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Cambia esto a tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todas las cabeceras
)


# Ruta con parámetros (GET request)
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

# Ruta para enviar datos usando POST request
@app.post("/create-item/")
def create_item(item: dict):
    return {"item": item, "message": "Item creado con éxito"}


@app.get("/")
async def check_connection():
    try:
        client.admin.command("ping")
        return {"message": "Conexión a MongoDB exitosa"}
    except ConnectionFailure:
        raise HTTPException(status_code=500, detail="Error de conexión con la base de datos")

@app.post("/register", response_model=UserResponse)
async def register_user(user_create: UserCreate):
    # Verificar si el usuario ya existe
    existing_user = await collection.find_one({"email": user_create.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado.")

    # Encriptar la contraseña
    user_create.password = await hash_password(user_create.password)

    # Insertar el nuevo usuario en la base de datos
    result = await collection.insert_one(user_create.dict())
    user_id = str(result.inserted_id)

    # Responder con los datos del usuario creado
    return {"id": user_id, "name": user_create.name, "email": user_create.email}

@app.post("/login")
async def login_user(user_login: UserLogin):
    # Verificar si el usuario existe
    user = await collection.find_one({"email": user_login.email})
    if not user or not await verify_password(user_login.password, user["password"]):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas.")

    # Responder con los datos del usuario
    return {"message": "Inicio de sesión exitoso", "user": {"id": str(user["_id"]), "name": user["name"], "email": user["email"]}}