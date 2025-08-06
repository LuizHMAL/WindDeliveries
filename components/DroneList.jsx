import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DroneList() {
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchDrones() {
      try {
        const response = await axios.get('http://localhost:5000/drones');
        setDrones(response.data);
      } catch (error) {
        setErro('Erro ao buscar drones');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDrones();
  }, []);

  if (loading) return <p>Carregando drones...</p>;
  if (erro) return <p>{erro}</p>;
  if (drones.length === 0) return <p>Nenhum drone encontrado.</p>;

  return (
    <div>
      <h2>Lista de Drones</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {drones.map((drone, index) => (
          <li
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
          >
            <p><strong>Modelo:</strong> {drone.model}</p>
            <p><strong>Bateria:</strong> {drone.battery}%</p>
            <p><strong>Status:</strong> {drone.status}</p>
            <p><strong>Capacidade:</strong> {drone.capacity}kg</p>
            <p><strong>Distância Máx:</strong> {drone.distance}m</p>
            <p><strong>Localização:</strong> ({drone.location_x}, {drone.location_y})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DroneList;
