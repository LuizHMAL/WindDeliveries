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
      <ul>
        {drones.map((drone, index) => (
          <li key={index}>
            <strong>Modelo:</strong> {drone.model} <br />
            <strong>Bateria:</strong> {drone.battery}% <br />
            <strong>Status:</strong> {drone.status} <br />
            <strong>Capacidade:</strong> {drone.capacity}kg <br />
            <strong>Distância Máx:</strong> {drone.distance}m <br />
            <strong>Localização:</strong> ({drone.location?.x}, {drone.location?.y})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DroneList;
