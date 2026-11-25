from fastapi import APIRouter, Depends, HTTPException
from conexion.conexion import obtener_conexion
from modelos.models import Resenia
from managers.reseniaManage import ReseniaManage

router = APIRouter(prefix="/resenia", tags=["resenias"])

@router.get('/')
def obtener_resenias(conexion=Depends(obtener_conexion)):
    return ReseniaManage.obtener(conexion)

@router.post('/agregar')
def agregar_resenia(resenia: Resenia, conexion=Depends(obtener_conexion)):
    if not resenia.comentario.strip():
        raise HTTPException(status_code=400, detail="El comentario no puede estar vacío")
    return ReseniaManage.insertar(resenia, conexion)

@router.put('/editar')
def editar_resenia(id: int, resenia: Resenia, conexion=Depends(obtener_conexion)):
    if not resenia.comentario.strip():
        raise HTTPException(status_code=400, detail="El comentario no puede estar vacío")
    return ReseniaManage.editar(id, resenia, conexion)

@router.get('/eliminar')
def eliminar_resenia(id: int, conexion=Depends(obtener_conexion)):
    return ReseniaManage.eliminar(id, conexion)
