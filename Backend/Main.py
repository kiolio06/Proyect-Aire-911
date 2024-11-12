from fastapi import FastAPI

# Inicializar la aplicación de FastAPI
app = FastAPI()

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
