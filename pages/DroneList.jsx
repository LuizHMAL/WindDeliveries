import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateDrone from '../components/CreateDrone';

function DroneList() {
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);


  useEffect(() => {
    fetchDrones();
  }, []);


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

  // Função para carregar bateria do drone
  async function handleCarregarDrone(droneId) {
    try {
      await axios.post(`http://localhost:5000/drones/${droneId}/carregar-bateria`);
      alert("Drone carregado com sucesso!");
      fetchDrones(); // Atualiza a lista após carregar
    } catch (error) {
      console.error("Erro ao carregar drone:", error);
      alert("Erro ao carregar drone.");
    }
  }
  async function handleExcluirDrone(droneId) {
    try {  
      await axios.delete(`http://localhost:5000/drones/${droneId}`);
      alert("Drone excluído com sucesso!");
      fetchDrones();  
    } catch (error) {
      console.error("Erro ao excluir drone:", error);
      alert("Erro ao excluir drone.");
    }
  }

  if (loading) return <p>Carregando drones...</p>;
  if (erro) return <p>{erro}</p>;
  if (drones.length === 0) return <p>Nenhum drone encontrado.</p>;

  return (
    
    
    <div>
        <CreateDrone />
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
            <id><strong>ID do Drone:</strong> {drone.id}</id>
            <p><strong>Modelo:</strong> {drone.model}</p>
            <p><strong>Bateria:</strong> {drone.battery}%</p>
            <p><strong>Status:</strong> {drone.status}</p>
            <p><strong>Capacidade:</strong> {drone.capacity}kg</p>
            <p><strong>Distância Máx:</strong> {drone.distance}m</p>
            <p><strong>Localização:</strong> ({drone.location_x}, {drone.location_y})</p>
            <button onClick={() => handleCarregarDrone(drone.id)}>Carregar drone</button>
            <button onClick={() => handleExcluirDrone(drone.id)} style={{ marginLeft: '10px' }}>Excluir Drone</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DroneList;
