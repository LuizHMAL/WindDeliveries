import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DroneList from '../pages/DroneList';
import LocationsList from '../pages/LocationsList';
import DeliveriesList from '../pages/DeliveriesList'; 
import RequestDeliveryForm from '../components/RequestDelivery';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Dashboard de Drones</h1>

        <nav style={{ marginBottom: '20px' }}>
          <Link to="/drones" style={{ marginRight: '15px' }}>Drones</Link>
          <Link to="/locations" style={{ marginRight: '15px' }}>Localizações</Link>
          <Link to="/deliveries" style={{ marginRight: '15px' }}>Entregas</Link>
          <Link to="/request_a_delivery" style={{ marginRight: '15px' }}>Solicitar Entrega</Link>
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
