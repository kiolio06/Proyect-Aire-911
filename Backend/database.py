from motor.motor_asyncio import AsyncIOMotorClient

uri = "mongodb+srv://rivejuan987:Juann9876@cluster0.wr8kl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Usar AsyncIOMotorClient en lugar de MongoClient para la conexión asincrónica
client = AsyncIOMotorClient(uri)
db = client["DataUser"]
collection = db["DataRegister"]
