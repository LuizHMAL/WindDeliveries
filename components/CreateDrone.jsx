import React, { useState } from 'react';
import axios from 'axios';

function CreateDrone() {
  const [model, setModel] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [distance, setDistance] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const droneData = {
      model,
      battery: 100, // fixo
      capacity,
      status: 'available', // fixo
      distance
    };

    try {
      await axios.post('http://localhost:5000/drones', droneData);
      setSuccess(true);
      setError('');
      setModel('');
      setCapacity(0);
      setDistance(0);
    } catch (err) {
      console.error(err);
      setError('Erro ao criar drone. Verifique os dados.');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Criar Novo Drone</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Modelo:</label><br />
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Capacidade (kg):</label><br />
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            required
            min="0"
          />
        </div>

        <div>
          <label>Distância (km):</label><br />
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            required
            min="0"
          />
        </div>

        <br />
        <button type="submit">Criar Drone</button>
      </form>

      {success && <p style={{ color: 'green' }}>Drone criado com sucesso!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateDrone;
