import { obtener } from './pelicula.js';

const seccionPeliculas = document.querySelector('.seccionPeliculas')
const peliculaEspecifica = document.querySelector('.peliculaEspecifica')
const fondoTransparente = document.querySelector('.fondoTransparente')

function cerrarPeliculaEspecifica() {
    peliculaEspecifica.classList.add('oculta')
    fondoTransparente.classList.add('oculta')
}

fondoTransparente.addEventListener('click', cerrarPeliculaEspecifica)

const API = "https://tp-final-api.onrender.com/"
// rutas
const pelicula = 'pelicula'
const usuario = 'usuario'
const genero = 'genero'
const peliculaGenero = 'peliculaGenero'
const resenias = 'resenia'
// acciones
const agregar = 'agregar'
const editar = 'editar'
const eliminar = 'eliminar'


inicio()

async function inicio() {
    renderizarPelicula(await obtener(API + pelicula))
}

function crearPelicula(pelicula){
    const div = document.createElement('div')
    div.classList.add("pelicula");

    div.addEventListener("click", function(){
        console.log(pelicula)
        crearPeliculaEspecifica(pelicula)
    })

    const img = document.createElement('img')
    img.src = pelicula.portada

    const p = document.createElement('p')
    p.textContent = pelicula.titulo

    div.append(img, p)
    return div
}

function renderizarPelicula(peliculas) {
    seccionPeliculas.innerHTML = ''
    const fragment = document.createDocumentFragment();

    peliculas.forEach(pelicula => {
        const tarjeta = crearPelicula(pelicula);
        fragment.prepend(tarjeta);
    });

    seccionPeliculas.appendChild(fragment);
}

// seccionPeliculas.addEventListener("click", (event) => {
//     const tarjeta = event.target.closest(".pelicula");

//     console.log(tarjeta);


// })

function crearPeliculaEspecifica(peli){
    peliculaEspecifica.innerHTML = ''

    const cerrar = document.createElement("button")
    cerrar.type = "button"
    cerrar.classList.add("cerrarPelicula")
    cerrar.setAttribute("aria-label", "Cerrar detalle de la película")
    cerrar.textContent = "×"
    cerrar.addEventListener("click", cerrarPeliculaEspecifica)

    const img = document.createElement("img")
    img.src = peli.portada

    const titulo = document.createElement("p")
    titulo.textContent = peli.titulo

    const div = document.createElement("div")

    const anio = document.createElement("p")
    const director = document.createElement("p")

    anio.textContent = `Año: ${peli.anio}`
    director.textContent = `Director: ${peli.director}`


    const sinopsis = document.createElement("p")
    sinopsis.textContent = peli.sinopsis

    div.append(anio, director)
    peliculaEspecifica.append(cerrar, img, titulo, div, sinopsis)
    peliculaEspecifica.classList.remove("oculta")
    fondoTransparente.classList.remove('oculta')
}
