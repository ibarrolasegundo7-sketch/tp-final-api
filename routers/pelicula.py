from fastapi import APIRouter, Depends
from conexion.conexion import obtener_conexion
from modelos.models import Pelicula
from managers.peliculaManage import PeliculaManage

router = APIRouter(prefix="/pelicula", tags=["peliculas"])

@router.get('/')
def obtener_peliculas(conexion=Depends(obtener_conexion)):
    return PeliculaManage.obtener(conexion)

@router.post('/agregar')
def agregar_pelicula(pelicula: Pelicula, conexion=Depends(obtener_conexion)):
    return PeliculaManage.insertar(pelicula, conexion)

@router.put('/editar')
def editar_pelicula(id: int, pelicula: Pelicula, conexion=Depends(obtener_conexion)):
    return PeliculaManage.editar(id, pelicula, conexion)

@router.get('/eliminar')
def eliminar_pelicula(id: int, conexion=Depends(obtener_conexion)):
    return PeliculaManage.eliminar(id, conexion)
