from interface import CRUD

class ReseniaManage(CRUD):

    def obtener(conexion):
        res = conexion.execute("SELECT * FROM resenias").fetchall()
        return [dict(item) for item in res]

    def editar(id, resenia, conexion):
        conexion.execute(
            "UPDATE resenias SET id_usuario = %s, id_pelicula = %s, puntaje = %s, comentario = %s, fecha = %s WHERE id = %s",
            (resenia.id_usuario, resenia.id_pelicula, resenia.puntaje, resenia.comentario, resenia.fecha, id)
        )
        conexion.commit()
        return {"mensaje": "reseña editada correctamente"}

    def insertar(resenia, conexion):
        conexion.execute(
            "INSERT INTO resenias (id_usuario, id_pelicula, puntaje, comentario, fecha) VALUES (%s, %s, %s, %s, %s)",
            (resenia.id_usuario, resenia.id_pelicula, resenia.puntaje, resenia.comentario, resenia.fecha)
        )
        conexion.commit()
        return {"mensaje": "reseña agregada correctamente"}

    def eliminar(id, conexion):
        conexion.execute(
            "DELETE FROM resenias WHERE id = %s",
            (id,)
        )
        return {"mensaje": "reseña eliminada correctamente"}
