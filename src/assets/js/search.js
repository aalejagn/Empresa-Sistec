// search.js - Script de búsqueda para SISTEC READ

// Función para obtener todos los libros en un array plano
function obtenerTodosLosLibros() {
    const todosLosLibros = [];
    
    for (const categoria in librosData) {
        librosData[categoria].forEach(libro => {
            libro.categoria = categoria;
            todosLosLibros.push(libro);
        });
    }
    
    return todosLosLibros;
}

// Función principal de búsqueda
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        showSearchMessage('Por favor, ingresa un término de búsqueda');
        return;
    }

    const todosLosLibros = obtenerTodosLosLibros();
    const resultados = todosLosLibros.filter(libro => 
        libro.titulo.toLowerCase().includes(searchTerm) ||
        libro.autor.toLowerCase().includes(searchTerm) ||
        (libro.descripcion && libro.descripcion.toLowerCase().includes(searchTerm)) ||
        (libro.editorial && libro.editorial.toLowerCase().includes(searchTerm)) ||
        (libro.encuadernacion && libro.encuadernacion.toLowerCase().includes(searchTerm))
    );

    displaySearchResults(resultados, searchTerm);
}

// Función para mostrar resultados en modal
function displaySearchResults(resultados, searchTerm) {
    // Crear modal de resultados
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        z-index: 1000;
        padding: 20px;
        overflow-y: auto;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'search-modal-content';
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    `;

    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #2c3e50;">
                <i class="fas fa-search"></i>
                Resultados de búsqueda
            </h2>
            <button class="close-search-modal" style="
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #7f8c8d;
            ">&times;</button>
        </div>
        
        <div style="margin-bottom: 20px; color: #7f8c8d;">
            <strong>Término buscado:</strong> "${searchTerm}"
            <br>
            <strong>Encontrados:</strong> ${resultados.length} libro${resultados.length !== 1 ? 's' : ''}
        </div>
    `;

    if (resultados.length === 0) {
        html += `
            <div style="text-align: center; padding: 40px; color: #7f8c8d;">
                <i class="fas fa-book" style="font-size: 48px; margin-bottom: 20px; color: #bdc3c7;"></i>
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otros términos de búsqueda</p>
            </div>
        `;
    } else {
        html += `<div class="search-results-grid">`;
        
        resultados.forEach(libro => {
            html += `
                <div class="search-result-card" style="
                    border: 1px solid #ecf0f1;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 15px;
                    background: #f8f9fa;
                    transition: transform 0.2s;
                    cursor: pointer;
                " onclick="cerrarBusqueda()">
                    <div style="display: flex; gap: 15px;">
                        <img src="${libro.imagen}" alt="${libro.titulo}" 
                             style="width: 80px; height: 120px; object-fit: cover; border-radius: 4px;">
                        <div style="flex: 1;">
                            <h4 style="margin: 0 0 8px 0; color: #2c3e50;">${libro.titulo}</h4>
                            <p style="margin: 0 0 8px 0; color: #34495e;"><strong>Autor:</strong> ${libro.autor}</p>
                            <p style="margin: 0 0 8px 0; color: #7f8c8d; font-size: 14px;">
                                <i class="fas fa-tag"></i> ${titulosCategorias[libro.categoria]}
                            </p>
                            <p style="margin: 0 0 8px 0; color: #27ae60; font-weight: bold;">${libro.precio}</p>
                            ${libro.descripcion ? `
                                <p style="margin: 0; color: #5d6d7e; font-size: 14px; line-height: 1.4;">
                                    ${libro.descripcion.substring(0, 150)}...
                                </p>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    }

    modalContent.innerHTML = html;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Event listeners para cerrar modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-search-modal')) {
            cerrarBusqueda();
        }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            cerrarBusqueda();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Función para cerrar el modal de búsqueda
function cerrarBusqueda() {
    const modal = document.querySelector('.search-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Función para mostrar mensajes temporales
function showSearchMessage(message) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    modal.textContent = message;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 3000);
}

// Inicializar el buscador
function inicializarBuscador() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) {
        console.warn('Elementos de búsqueda no encontrados');
        return;
    }

    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    console.log('Buscador inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarBuscador();
});

// Función global para búsqueda desde otras páginas
function buscarLibros(termino) {
    const todosLosLibros = obtenerTodosLosLibros();
    
    return todosLosLibros.filter(libro => 
        libro.titulo.toLowerCase().includes(termino.toLowerCase()) ||
        libro.autor.toLowerCase().includes(termino.toLowerCase()) ||
        (libro.descripcion && libro.descripcion.toLowerCase().includes(termino.toLowerCase()))
    );
}