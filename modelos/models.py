from pydantic import BaseModel
from datetime import datetime

class Pelicula(BaseModel):
    titulo: str
    anio: int
    portada: str
    director: str
    sinopsis: str

class Usuario(BaseModel):
    nombre: str
    nombre_usuario: str
    email: str
    password: str

class Genero(BaseModel):
    genero: str

class PeliculaGeneroModel(BaseModel):
    id_pelicula: int
    id_genero: int

class Resenia(BaseModel):
    id_usuario: int
    id_pelicula: int
    puntaje: int
    comentario: str
    fecha: datetime
