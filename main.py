from conexion.conexion import obtener_conexion
from fastapi import FastAPI, Depends
from routers import pelicula, usuarios, generos, peliculaGenero, resenias
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(pelicula.router)
app.include_router(usuarios.router)
app.include_router(generos.router)
app.include_router(peliculaGenero.router)
app.include_router(resenias.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}
