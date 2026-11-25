import { obtener } from './pelicula.js';

const seccionPeliculas = document.querySelector('.seccionPeliculas')

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