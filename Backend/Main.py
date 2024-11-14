from fastapi import FastAPI
from exercises.controllers import router as exercises_router

app = FastAPI()

# Registrar el router para el módulo de ejercicios
app.include_router(exercises_router, prefix="/exercises", tags=["Exercises"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Exercise AI API"}

