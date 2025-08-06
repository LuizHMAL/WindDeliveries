// components/DeliveriesList.jsx
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
      {deliveries.length === 0 ? (
        <p>Nenhuma entrega registrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {deliveries.map((delivery) => (
            <li
              key={delivery.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <p><strong>Modelo do Drone:</strong> {delivery.droneModel}</p>
              <p><strong>Bateria:</strong> {delivery.battery}%</p>
              <p><strong>Status:</strong> {delivery.status}</p>
              <p><strong>Capacidade:</strong> {delivery.capacity} kg</p>
              <p><strong>Distância:</strong> {delivery.distance} m</p>
              <p><strong>Origem:</strong> ({delivery.originLocationX}, {delivery.originLocationY})</p>
              <p><strong>Destino:</strong> ({delivery.destinationCartesianX}, {delivery.destinationCartesianY})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeliveriesList;
