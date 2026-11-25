from interface import CRUD

class UsuarioManage(CRUD):

    def obtener(conexion):
        res = conexion.execute("SELECT * FROM usuarios").fetchall()
        return [dict(item) for item in res]

    def editar(id, usuario, conexion):
        conexion.execute("UPDATE usuarios SET nombre = %s, nombre_usuario = %s, email = %s, password = %s WHERE id = %s",
        (usuario.nombre, usuario.nombre_usuario, usuario.email, usuario.password, id))
        conexion.commit()
        return {"mensaje": "usuario editado correctamente"}

    def insertar(usuario, conexion):
        conexion.execute("INSERT INTO usuarios (nombre, nombre_usuario, email, password) VALUES (%s, %s, %s, %s)",
        (usuario.nombre, usuario.nombre_usuario, usuario.email, usuario.password))
        conexion.commit()
        return {"mensaje": "usuario agregado correctamente"}

    def eliminar(id, conexion):
        conexion.execute(
            "DELETE FROM usuarios WHERE id = %s",
            (id,)
        )
        return {"mensaje": "usuario eliminado correctamente"}
