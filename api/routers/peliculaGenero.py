from fastapi import APIRouter, Depends
from conexion.conexion import obtener_conexion
from modelos.models import PeliculaGeneroModel
from managers.peliculaGeneroManage import PeliculaGeneroManage

router = APIRouter(prefix="/peliculaGenero", tags=["peliculaGenero"])

@router.get('/')
def obtener_relaciones(conexion=Depends(obtener_conexion)):
    return PeliculaGeneroManage.obtener(conexion)

@router.post('/agregar')
def agregar_relacion(relacion: PeliculaGeneroModel, conexion=Depends(obtener_conexion)):
    return PeliculaGeneroManage.insertar(relacion, conexion)

@router.put('/editar')
def editar_relacion(nuevo_genero_id: int, relacion: PeliculaGeneroModel, conexion=Depends(obtener_conexion)):
    return PeliculaGeneroManage.editar(nuevo_genero_id, relacion, conexion)

@router.delete('/eliminar')
def eliminar_relacion(relacion: PeliculaGeneroModel, conexion=Depends(obtener_conexion)):
    return PeliculaGeneroManage.eliminar(relacion, conexion)
