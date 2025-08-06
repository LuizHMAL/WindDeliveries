import React, { useState } from 'react';
import axios from 'axios';

function CreateLocation() {
  const [name, setName] = useState('');
  const [cartesianX, setCartesianX] = useState('');
  const [cartesianY, setCartesianY] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    const locationData = {
      name,
      cartesian_x: parseInt(cartesianX, 10),
      cartesian_y: parseInt(cartesianY, 10),
    };

    try {
      const response = await axios.post('http://localhost:5000/locations', locationData);
      console.log('Localização criada com sucesso:', response.data);
      setSuccess(true);
      setName('');
      setCartesianX('');
      setCartesianY('');
    } catch (error) {
      console.error('Erro ao criar localização:', error);
      setError('Erro ao criar localização. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Criar Nova Localização</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label><br />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="cartesianX">Coordenada X:</label><br />
          <input
            id="cartesianX"
            type="number"
            value={cartesianX}
            onChange={(e) => setCartesianX(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="cartesianY">Coordenada Y:</label><br />
          <input
            id="cartesianY"
            type="number"
            value={cartesianY}
            onChange={(e) => setCartesianY(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Localização'}
        </button>
      </form>

      {success && <p style={{ color: 'green' }}>Localização criada com sucesso!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateLocation;
