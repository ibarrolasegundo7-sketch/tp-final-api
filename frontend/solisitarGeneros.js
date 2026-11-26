import { obtener } from './pelicula.js'

export async function solicitarGeneros(url, idPelicula) {
    const relaciones = await obtener(`${url}?id_pelicula=${encodeURIComponent(idPelicula)}`)
    return (relaciones ?? []).map(relacion => relacion.genero)
}
