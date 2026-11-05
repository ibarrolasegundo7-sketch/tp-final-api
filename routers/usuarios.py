from fastapi import APIRouter, Depends
from conexion.conexion import obtener_conexion
from modelos.models import Usuario
from managers.usuarioManage import UsuarioManage

router = APIRouter(prefix="/usuario", tags=["usuarios"])

@router.get('/')
def obtener_usuarios(conexion=Depends(obtener_conexion)):
    return UsuarioManage.obtener(conexion)

@router.post('/agregar')
def agregar_usuario(usuario: Usuario, conexion=Depends(obtener_conexion)):
    return UsuarioManage.insertar(usuario, conexion)

@router.put('/editar')
def editar_usuario(id: int, usuario: Usuario, conexion=Depends(obtener_conexion)):
    return UsuarioManage.editar(id, usuario, conexion)

@router.get('/eliminar')
def eliminar_usuario(id: int, conexion=Depends(obtener_conexion)):
    return UsuarioManage.eliminar(id, conexion)
