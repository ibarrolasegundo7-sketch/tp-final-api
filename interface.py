from abc import ABC, abstractmethod

class CRUD(ABC):

    def obtener(conexion):
        pass

    def insertar(datos, conexion):
        pass

    def editar(id, datos, conexion):
        pass

    def eliminar(id, conexion):
        pass
