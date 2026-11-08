from interface import CRUD

class PeliculaManage(CRUD):

    def obtener(conexion):
        res = conexion.execute("SELECT * FROM peliculas").fetchall()
        return [dict(item) for item in res]

    def editar(id, pelicula, conexion):
        conexion.execute("UPDATE peliculas SET titulo = %s, anio = %s, portada = %s, director = %s, sinopsis = %s WHERE id = %s",
        (pelicula.titulo, pelicula.anio, pelicula.portada, pelicula.director, pelicula.sinopsis, id))
        conexion.commit()
        return {"mensaje": "película editada correctamente"}

    def insertar(pelicula, conexion):
        conexion.execute("INSERT INTO peliculas (titulo, anio, portada, director, sinopsis) VALUES (%s, %s, %s, %s, %s)",
        (pelicula.titulo, pelicula.anio, pelicula.portada, pelicula.director, pelicula.sinopsis))
        conexion.commit()
        return {"mensaje": "película agregada correctamente"}

    def eliminar(id, conexion):
        conexion.execute(
            "DELETE FROM peliculas WHERE id = %s",
            (id,)
        )
        return {"mensaje": "película eliminada correctamente"}
