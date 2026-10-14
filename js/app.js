// js/app.js
import { pokemonData } from './datos.js';
import { filtrarPokemones, contarPokemones } from './logica.js';

const TYPE_COLORS = {
    electric: { bg: 'bg-[#F8D030]', text: 'text-[#1F2340]', border: 'border-[#F8D030]' },
    fire:     { bg: 'bg-[#F08030]', text: 'text-white',     border: 'border-[#F08030]' },
    water:    { bg: 'bg-[#6890F0]', text: 'text-white',     border: 'border-[#6890F0]' },
    grass:    { bg: 'bg-[#78C850]', text: 'text-white',     border: 'border-[#78C850]' },
    psychic:  { bg: 'bg-[#F85888]', text: 'text-white',     border: 'border-[#F85888]' },
    rock:     { bg: 'bg-[#A8A878]', text: 'text-white',     border: 'border-[#A8A878]' },
    normal:   { bg: 'bg-[#A8A878]', text: 'text-white',     border: 'border-[#A8A878]' }
};

const tarjetaHTML = (p) => {
    const colors = TYPE_COLORS[p.type];
    return `
    <article class="flex flex-col rounded-[16px] border-t-[6px] ${colors.border} bg-white px-5 pb-6 pt-7 text-center shadow-[0_6px_16px_rgba(31,35,64,0.08)] transition-all hover:border-t-[10px]">
        <span class="mx-auto mb-3 inline-block rounded-full ${colors.bg} px-3 py-1 text-[0.75rem] font-bold tracking-[0.3px] ${colors.text}">${p.typeName}</span>
        <img src="${p.image}" alt="${p.name}" class="mx-auto mb-3 max-w-[160px] transition-transform hover:scale-105">
        <h3 class="mb-2 mt-1 text-[1.25rem] font-bold">${p.name}</h3>
        <button type="button" data-id="${p.id}" class="mt-auto w-full rounded-lg bg-[#1F2340] py-2 font-bold text-[#F4F6FF] transition hover:bg-[#2C3161]">
            Ver detalle
        </button>
    </article>
    `;
};

// Referencias al DOM
const grilla = document.getElementById('grilla-pokemon');
const contadorElemento = document.getElementById('contador');
const formFiltros = document.querySelector('form[role="search"]');
const inputBusqueda = document.getElementById('busqueda');
const selectFiltro = document.getElementById('filtro');
const modal = document.getElementById('modal-detalle');

// Render con ESTADO VACÍO
const render = (lista) => {
    // Requisito: Contar
    const totalMostrados = contarPokemones(lista);
    const totalDatos = contarPokemones(pokemonData);
    if (contadorElemento) {
        contadorElemento.textContent = `Mostrando ${totalMostrados} de ${totalDatos} Pokémon`;
    }

    // Requisito: Estado vacío
    if (lista.length === 0) {
        grilla.innerHTML = `<div class="col-span-full py-12 text-center text-lg font-semibold text-[#1F2340]">No se encontraron Pokémon con esos filtros.</div>`;
        return;
    }

    grilla.innerHTML = lista.map(tarjetaHTML).join('');
};

// Inicializar
render(pokemonData);

// Buscador y Filtros usando logica.js
formFiltros.addEventListener('submit', (e) => {
    e.preventDefault();
    const termino = inputBusqueda.value.trim();
    const tipoSeleccionado = selectFiltro.value;
    
    // Llamamos a la función pura
    const resultados = filtrarPokemones(pokemonData, termino, tipoSeleccionado);
    render(resultados);
});

// Modal y Delegación de Eventos
const abrirDetalle = (p) => {
    document.getElementById('modal-nombre').textContent = p.name;
    document.getElementById('modal-img').src = p.image;
    document.getElementById('modal-img').alt = p.name;
    document.getElementById('modal-tipo').textContent = p.typeName;
    document.getElementById('modal-descripcion').textContent = p.description;
    modal.showModal();
};

grilla.addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-id]');
    if (!boton) return;
    
    const idPokemon = Number(boton.dataset.id);
    const pokemon = pokemonData.find((p) => p.id === idPokemon);
    if (pokemon) abrirDetalle(pokemon);
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});