import { obtener } from './pelicula.js';
import { solicitarGeneros } from './solisitarGeneros.js';

const seccionPeliculas = document.querySelector('.seccionPeliculas')
const peliculaEspecifica = document.querySelector('.peliculaEspecifica')
const fondoTransparente = document.querySelector('.fondoTransparente')
const botonEditar = document.querySelector('.botonEditar')
const botonBorrar = document.querySelector('.botonBorrar')
const editarPelicula = document.querySelector('.editarPelicula')
const formularioEdicion = document.querySelector('.formularioEdicion')
const mensajeEdicion = document.querySelector('.mensajeEdicion')
const campoPortada = formularioEdicion.elements.namedItem('portada')
const vistaPreviaPortada = document.querySelector('.vistaPreviaPortada')
const mensajePortada = document.querySelector('.mensajePortada')
const seguroBorrar = document.querySelector('.seguroBorrar')
const confirmarBorrar = document.querySelector('.confirmarBorrar')
const cancelarBorrar = document.querySelector('.cancelarBorrar')
const mensajeBorrar = document.querySelector('.mensajeBorrar')
let modoEdicion = false
let modoBorrar = false
let peliculaSeleccionada = null

function actualizarVistaPrevia() {
    const url = campoPortada.value.trim()
    vistaPreviaPortada.hidden = true
    mensajePortada.textContent = url ? 'Cargando vista previa...' : 'Ingresá una URL para ver la portada'
    if (url) vistaPreviaPortada.src = url
    else vistaPreviaPortada.removeAttribute('src')
}

campoPortada.addEventListener('input', actualizarVistaPrevia)
vistaPreviaPortada.addEventListener('load', () => {
    vistaPreviaPortada.hidden = false
    mensajePortada.textContent = ''
})
vistaPreviaPortada.addEventListener('error', () => {
    vistaPreviaPortada.hidden = true
    mensajePortada.textContent = 'No se pudo cargar la imagen de esa URL'
})

function cerrarPeliculaEspecifica() {
    peliculaEspecifica.classList.add('oculta')
    fondoTransparente.classList.add('oculta')
}

function cerrarEditor() {
    editarPelicula.classList.add('oculta')
    fondoTransparente.classList.add('oculta')
    peliculaSeleccionada = null
}

function cerrarBorrado() {
    if (confirmarBorrar.disabled) return
    seguroBorrar.classList.add('oculta')
    fondoTransparente.classList.add('oculta')
    peliculaSeleccionada = null
}

cancelarBorrar.addEventListener('click', cerrarBorrado)
confirmarBorrar.addEventListener('click', borrarPelicula)

fondoTransparente.addEventListener('click', () => {
    if (!seguroBorrar.classList.contains('oculta')) cerrarBorrado()
    else if (!editarPelicula.classList.contains('oculta')) cerrarEditor()
    else cerrarPeliculaEspecifica()
})

botonEditar.addEventListener('click', () => {
    if (confirmarBorrar.disabled) return
    cerrarBorrado()
    modoEdicion = !modoEdicion

    if (modoEdicion) {
        modoBorrar = false
        botonBorrar.setAttribute('aria-pressed', 'false')
        document.body.classList.remove('modoBorrar')
        cerrarPeliculaEspecifica()
    }

    botonEditar.setAttribute('aria-pressed', String(modoEdicion))
    document.body.classList.toggle('modoEdicion', modoEdicion)

    cerrarEditor()
})

botonBorrar.addEventListener('click', () => {
    if (confirmarBorrar.disabled) return
    cerrarBorrado()
    modoBorrar = !modoBorrar

    if (modoBorrar) {
        modoEdicion = false
        botonEditar.setAttribute('aria-pressed', 'false')
        document.body.classList.remove('modoEdicion')
        cerrarPeliculaEspecifica()
    }

    botonBorrar.setAttribute('aria-pressed', String(modoBorrar))
    document.body.classList.toggle('modoBorrar', modoBorrar)

    cerrarEditor()
})

document.querySelector('.cerrarEdicion').addEventListener('click', cerrarEditor)

const API = "https://tp-final-api.vercel.app/"
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
    div.dataset.id = pelicula.id

    div.addEventListener("click", function(){
        if (modoEdicion) abrirEditor(pelicula)
        else if (modoBorrar) {
            peliculaSeleccionada = pelicula
            mensajeBorrar.textContent = `¿Querés eliminar "${pelicula.titulo}"?`
            seguroBorrar.classList.remove('oculta')
            fondoTransparente.classList.remove('oculta')
            cancelarBorrar.focus()
        }
        else crearPeliculaEspecifica(pelicula)
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

function abrirEditor(peli) {
    cerrarPeliculaEspecifica()
    peliculaSeleccionada = peli
    mensajeEdicion.textContent = ''
    for (const campo of ['titulo', 'anio', 'portada', 'director', 'sinopsis']) {
        formularioEdicion.elements.namedItem(campo).value = peli[campo]
    }
    actualizarVistaPrevia()
    editarPelicula.classList.remove('oculta')
    fondoTransparente.classList.remove('oculta')
}

async function borrarPelicula(){
    if (!peliculaSeleccionada || confirmarBorrar.disabled) return

    const id = peliculaSeleccionada.id
    confirmarBorrar.disabled = true
    cancelarBorrar.disabled = true
    mensajeBorrar.textContent = 'Eliminando película...'

    try {
        const respuesta = await fetch(`${API}${pelicula}/${eliminar}?id=${id}`)
        if (!respuesta.ok) throw new Error('No se pudo eliminar la película. Intentá nuevamente.')

        for (const tarjeta of seccionPeliculas.children) {
            if (tarjeta.dataset.id === String(id)) {
                tarjeta.remove()
                break
            }
        }
        confirmarBorrar.disabled = false
        cerrarBorrado()
        modoBorrar = false
        botonBorrar.setAttribute('aria-pressed', 'false')
        document.body.classList.remove('modoBorrar')
        botonBorrar.focus()
    } catch (error) {
        mensajeBorrar.textContent = error.message
    } finally {
        confirmarBorrar.disabled = false
        cancelarBorrar.disabled = false
    }
}

formularioEdicion.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (!peliculaSeleccionada) return

    const botonGuardar = formularioEdicion.querySelector('.guardarEdicion')
    botonGuardar.disabled = true
    mensajeEdicion.textContent = ''
    const datos = Object.fromEntries(new FormData(formularioEdicion))
    datos.anio = Number(datos.anio)

    try {
        const respuesta = await fetch(`${API}${pelicula}/${editar}?id=${peliculaSeleccionada.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        })
        if (!respuesta.ok) throw new Error('No se pudo guardar la película')

        const peliculas = await obtener(API + pelicula)
        if (!Array.isArray(peliculas)) throw new Error('No se pudo actualizar la lista')
        renderizarPelicula(peliculas)
        cerrarEditor()
        modoEdicion = false
        botonEditar.setAttribute('aria-pressed', 'false')
        document.body.classList.remove('modoEdicion')
    } catch (error) {
        mensajeEdicion.textContent = error.message
    } finally {
        botonGuardar.disabled = false
    }
})

async function crearPeliculaEspecifica(peli){
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
    const generos = document.createElement("p")

    anio.textContent = `Año: ${peli.anio}`
    director.textContent = `Director: ${peli.director}`
    generos.textContent = 'Géneros: cargando...'


    const sinopsis = document.createElement("p")
    sinopsis.textContent = peli.sinopsis

    div.append(anio, director, generos)
    peliculaEspecifica.append(cerrar, img, titulo, div, sinopsis)
    peliculaEspecifica.classList.remove("oculta")
    fondoTransparente.classList.remove('oculta')

    const listaGeneros = await solicitarGeneros(API + peliculaGenero, peli.id)
    if (generos.isConnected && !peliculaEspecifica.classList.contains('oculta')) {
        generos.textContent = listaGeneros.length
            ? `Géneros: ${listaGeneros.join(', ')}`
            : 'Géneros: sin géneros asignados'
    }
}
