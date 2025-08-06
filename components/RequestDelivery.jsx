import React, { useState } from 'react';

function RequestDeliveryForm() {
  const [droneId, setDroneId] = useState('');
  const [destination, setDestination] = useState('');
  const [payload, setPayload] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const price = parseFloat(payload) * 10; // R$10 por kg
    const delivery = {
      droneId: parseInt(droneId),
      destinationId: parseInt(destination),
      price,
      priority: 'normal',
      payload: parseFloat(payload)
    };

    try {
      const response = await fetch('http://localhost:5000/deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(delivery)
      });

      if (response.ok) {
        setMessage('Entrega solicitada com sucesso!');
        setDroneId('');
        setDestination('');
        setPayload('');
      } else {
        const data = await response.json();
        setMessage(`Erro ao solicitar entrega: ${data.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro na comunicação com o servidor.');
    }
  };

  return (
    <div>
      <h2>Solicitar Entrega</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Drone:</label><br />
          <input
            type="number"
            value={droneId}
            onChange={(e) => setDroneId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>ID do Destino:</label><br />
          <input
            type="number"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Peso da Carga (kg):</label><br />
          <input
            type="number"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            required
            min="0.1"
            step="0.1"
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Solicitar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default RequestDeliveryForm;
