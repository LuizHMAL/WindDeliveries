import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DroneList from '../components/DroneList';
import LocationsList from '../components/LocationsList';
import DeliveriesList from '../components/DeliveriesList'; 
import RequestDeliveryForm from '../components/RequestDelivery';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Dashboard de Drones</h1>

        <nav style={{ marginBottom: '20px' }}>
          <Link to="/drones" style={{ marginRight: '15px' }}>Drones</Link>
          <Link to="/locations">Localizações</Link>
          <Link to="/deliveries" style={{ marginLeft: '15px' }}>Entregas</Link>
          <Link to="/request_a_delivery" style={{ marginLeft: '15px' }}>Solicitar Entrega</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Bem-vindo ao Dashboard!</h2>} />
          <Route path="/drones" element={<DroneList />} />
          <Route path="/locations" element={<LocationsList />} />
          <Route path="/deliveries" element={<DeliveriesList />} />
          <Route path="/request_a_delivery" element={<RequestDeliveryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
