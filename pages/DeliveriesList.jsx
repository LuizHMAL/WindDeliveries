import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DeliveriesList() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function fetchDeliveries() {
      try {
        const response = await axios.get('http://localhost:5000/deliveries');
        console.log("Entregas recebidas:", response.data);
        setDeliveries(response.data);
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
      }
    }

    fetchDeliveries();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Entregas</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {deliveries.map((delivery) => (
          <li key={delivery.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
          }}>
            <p><strong>ID da Entrega:</strong> {delivery.id}</p>
            <p><strong>Drone:</strong> {delivery.drone_id}</p>
            <p><strong>Destino:</strong> {delivery.destination_id}</p>
            <p><strong>Origem:</strong> ({delivery.origin_location_x}, {delivery.origin_location_y})</p>
            <p><strong>Destino:</strong> ({delivery.destination_cartesian_x}, {delivery.destination_cartesian_y})</p>
            <p><strong>Distância:</strong> {delivery.distance} m</p>
            <p><strong>Preço:</strong> R$ {delivery.price}</p>
            <p><strong>Prioridade:</strong> {delivery.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeliveriesList;
