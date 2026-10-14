// js/logica.js

// Filtra el arreglo basándose en el texto y el tipo
export const filtrarPokemones = (lista, terminoBusqueda, tipoSeleccionado) => {
    return lista.filter((p) => {
        const matchNombre = p.name.toLowerCase().includes(terminoBusqueda.toLowerCase());
        const matchTipo = tipoSeleccionado === '' || p.type === tipoSeleccionado;
        return matchNombre && matchTipo;
    });
};

// Cuenta cuántos elementos hay (para cumplir el requisito de "contar")
export const contarPokemones = (lista) => {
    return lista.length;
};