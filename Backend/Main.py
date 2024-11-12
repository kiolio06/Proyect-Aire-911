from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo.errors import ConnectionFailure
from database import client, collection  # Importa client y collection desde database.py
from schemas import UserCreate, UserResponse

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


@app.get("/")
def read_root():
    return {"message": "Bienvenido a FastAPI"}

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
        # Ahora `client` está importado desde `database.py`
        client.admin.command('ping')
        return {"message": "Conexión a MongoDB exitosa"}
    except ConnectionFailure:
        raise HTTPException(status_code=500, detail="Error de conexión con la base de datos")

# Registro de usuario
@app.post("/register", response_model=UserResponse)
async def register_user(user_create: UserCreate):
    # Verificar si el usuario ya existe en la base de datos
    existing_user = await collection.find_one({"email": user_create.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado.")

    # Crear el nuevo documento con los datos validados
    new_user = user_create.dict()
    
    # Insertar el nuevo usuario en la base de datos
    result = await collection.insert_one(new_user)
    
    # Convertir el ObjectId a string
    new_user["_id"] = str(result.inserted_id)
    
    # Devolver la respuesta con los datos del usuario registrado
    return UserResponse(id=new_user["_id"], name=new_user["name"], email=new_user["email"])