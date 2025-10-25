import { performSearch } from './search';

function SearchModal({ searchTerm, onClose }) {
  const { resultados, mensaje } = performSearch(searchTerm);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}>
        <button onClick={onClose} style={{ float: 'right', padding: '5px 10px' }}>Cerrar</button>
        {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
        {resultados.map((libro, index) => (
          <div key={libro.titulo || index} style={{ margin: '10px 0' }}>
            <h3>{libro.titulo}</h3>
            <p><strong>Autor:</strong> {libro.autor}</p>
            <img src={libro.imagen} alt={libro.titulo} style={{ maxWidth: '100px' }} />
            <p>{libro.descripcion}</p>
            <p><strong>Precio:</strong> {libro.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchModal;