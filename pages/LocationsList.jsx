import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateLocation from '../components/CreateLocation';

function LocationsList() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);


 
 
  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Erro ao buscar locations:', error);
      setErro('Erro ao buscar locations');
    } finally {
      setLoading(false);
    }
  }

  async function handleExcluirLocation(id) {
    if (!window.confirm('Deseja realmente excluir esta localização?')) return;

    try {
      await axios.delete(`http://localhost:5000/locations/${id}`);
      alert('Localização excluída com sucesso!');

      // Atualiza o estado local removendo a location deletada
      setLocations((prev) => prev.filter((location) => location.id !== id));
    } catch (error) {
      console.error('Erro ao excluir location:', error);
      alert('Erro ao excluir location.');
    }
  }

  if (loading) return <p>Carregando localizações...</p>;
  if (erro) return <p>{erro}</p>;
  if (locations.length === 0) return <p>Nenhuma localização encontrada.</p>;

  return (

    <div>
       <CreateLocation />
      <h2>Lista de Localizações</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {locations.map((location) => (
          <li
            key={location.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
          >
            <p><strong>ID:</strong> {location.id}</p>
            <p><strong>Nome:</strong> {location.name}</p>
            <p><strong>Coordenada X:</strong> {location.cartesian_x}</p>
            <p><strong>Coordenada Y:</strong> {location.cartesian_y}</p>
            <button onClick={() => handleExcluirLocation(location.id)}>
              Excluir Localização
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationsList;
