// src/utils/search.js
import { librosData } from './categorias-data';

export function obtenerTodosLosLibros() {
  const todosLosLibros = [];
  for (const categoria in librosData) {
    librosData[categoria].forEach(libro => {
      libro.categoria = categoria;
      todosLosLibros.push(libro);
    });
  }
  return todosLosLibros;
}

export function performSearch(searchTerm) {
  if (searchTerm === '') {
    return { resultados: [], mensaje: 'Por favor, ingresa un término de búsqueda' };
  }
  const todosLosLibros = obtenerTodosLosLibros();
  const resultados = todosLosLibros.filter(libro =>
    libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (libro.descripcion && libro.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return { resultados, mensaje: resultados.length === 0 ? 'No se encontraron resultados' : '' };
}