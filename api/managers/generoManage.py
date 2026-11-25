from interface import CRUD

class GeneroManage(CRUD):

    def obtener(conexion):
        res = conexion.execute("SELECT * FROM generos").fetchall()
        return [dict(item) for item in res]

    def editar(id, genero, conexion):
        conexion.execute("UPDATE generos SET genero = %s WHERE id = %s",
        (genero.genero, id))
        conexion.commit()
        return {"mensaje": "género editado correctamente"}

    def insertar(genero, conexion):
        conexion.execute("INSERT INTO generos (genero) VALUES (%s)",
        (genero.genero,))
        conexion.commit()
        return {"mensaje": "género agregado correctamente"}

    def eliminar(id, conexion):
        conexion.execute(
            "DELETE FROM generos WHERE id = %s",
            (id,)
        )
        conexion.commit()
        return {"mensaje": "género eliminado correctamente"}
