# utils.py
from exercises.models import User, UserPreferences

# Función auxiliar para actualizar preferencias del usuario
def update_user_preferences(user: User, new_preferences: UserPreferences):
    user.preferences = new_preferences
    return user
