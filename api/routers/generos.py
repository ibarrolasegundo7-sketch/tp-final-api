from fastapi import APIRouter, Depends
from conexion.conexion import obtener_conexion
from modelos.models import Genero
from managers.generoManage import GeneroManage

router = APIRouter(prefix="/genero", tags=["generos"])

@router.get('/')
def obtener_generos(conexion=Depends(obtener_conexion)):
    return GeneroManage.obtener(conexion)

@router.post('/agregar')
def agregar_genero(genero: Genero, conexion=Depends(obtener_conexion)):
    return GeneroManage.insertar(genero, conexion)

@router.put('/editar')
def editar_genero(id: int, genero: Genero, conexion=Depends(obtener_conexion)):
    return GeneroManage.editar(id, genero, conexion)

@router.get('/eliminar')
def eliminar_genero(id: int, conexion=Depends(obtener_conexion)):
    return GeneroManage.eliminar(id, conexion)
