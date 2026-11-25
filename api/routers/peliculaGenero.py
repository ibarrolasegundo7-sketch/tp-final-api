from fastapi import APIRouter, Depends, HTTPException
from conexion.conexion import obtener_conexion
from modelos.models import PeliculaGeneroModel
from managers.peliculaGeneroManage import PeliculaGeneroManage

router = APIRouter(prefix="/peliculaGenero", tags=["peliculaGenero"])

@router.get('/')
def obtener_relaciones(conexion=Depends(obtener_conexion)):
    return PeliculaGeneroManage.obtener(conexion)

@router.post('/agregar')
def agregar_relacion(relacion: PeliculaGeneroModel, conexion=Depends(obtener_conexion)):
    if relacion.id_pelicula <= 0 or relacion.id_genero <= 0:
        raise HTTPException(status_code=400, detail="Los IDs deben ser mayores que cero")
    return PeliculaGeneroManage.insertar(relacion, conexion)

@router.put('/editar')
def editar_relacion(nuevo_genero_id: int, relacion: PeliculaGeneroModel, conexion=Depends(obtener_conexion)):
    if relacion.id_pelicula <= 0 or relacion.id_genero <= 0 or nuevo_genero_id <= 0:
        raise HTTPException(status_code=400, detail="Los IDs deben ser mayores que cero")
    return PeliculaGeneroManage.editar(nuevo_genero_id, relacion, conexion)

@router.delete('/eliminar')
def eliminar_relacion(relacion: PeliculaGeneroModel, conexion=Depends(obtener_conexion)):
    return PeliculaGeneroManage.eliminar(relacion, conexion)
