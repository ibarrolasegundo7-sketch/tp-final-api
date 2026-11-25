from interface import CRUD

class PeliculaGeneroManage(CRUD):

    def obtener(id_pelicula, conexion):
        res = conexion.execute("""

            SELECT g.genero
            FROM pelicula_genero AS pg
            JOIN generos AS g
                ON g.id = pg.id_genero
            WHERE pg.id_pelicula = %s

        """, (id_pelicula,)).fetchall()
        
        return [dict(item) for item in res]

    def editar(nuevo_genero_id, relacion, conexion):
        conexion.execute("""
            UPDATE pelicula_genero
            SET id_genero = %s
            WHERE id_pelicula = %s
                AND id_genero = %s
      """, 
        (nuevo_genero_id, relacion.id_pelicula, relacion.id_genero))

        conexion.commit()
        return {"mensaje": "relación película-género editada correctamente"}

    def insertar(relacion, conexion):
        conexion.execute("INSERT INTO pelicula_genero (id_pelicula, id_genero) VALUES (%s, %s)",
        (relacion.id_pelicula, relacion.id_genero))

        conexion.commit()
        return {"mensaje": "relación película-género agregada correctamente"}

    def eliminar(relacion, conexion):
        conexion.execute("""

            DELETE FROM pelicula_genero
            WHERE id_pelicula = %s
                AND id_genero = %s

        """,
        (relacion.id_pelicula, relacion.id_genero))
        
        conexion.commit()
        return {"mensaje": "relación película-género eliminada correctamente"}
