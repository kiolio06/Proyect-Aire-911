# main.py

from fastapi import FastAPI
from exercises.controllers import router as exercises_router

app = FastAPI()

from fastapi import FastAPI

app = FastAPI()

# Rutas de otros módulos, como el router de ejercicios
from exercises.controllers import router as exercises_router
app.include_router(exercises_router, prefix="/exercises")

# Ruta de la raíz
@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de recomendaciones de ejercicios"}


# Incluye el router
app.include_router(exercises_router, prefix="/exercises")
