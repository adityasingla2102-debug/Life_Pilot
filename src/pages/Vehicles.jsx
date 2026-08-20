import React, { useState } from 'react';
import StatCard from '../components/StatCard.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { getExpiryStatus } from '../data/initialData.jsx';

export default function Vehicles({ vehicles, setVehicles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    vehicleNumber: '',
    type: 'Car',
    purchaseDate: '',
    serviceDate: '',
    insuranceExpiry: '',
    pucExpiry: ''
  });

  const totalVehicles = vehicles.length;
  const serviceDueCount = vehicles.filter(v => getExpiryStatus(v.serviceDate) === 'EXPIRING SOON' || getExpiryStatus(v.serviceDate) === 'EXPIRED').length;
  const insuranceExpiringCount = vehicles.filter(v => getExpiryStatus(v.insuranceExpiry) === 'EXPIRING SOON' || getExpiryStatus(v.insuranceExpiry) === 'EXPIRED').length;
  const pucExpiringCount = vehicles.filter(v => getExpiryStatus(v.pucExpiry) === 'EXPIRING SOON' || getExpiryStatus(v.pucExpiry) === 'EXPIRED').length;

  const filteredVehicles = vehicles.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormData({ name: '', vehicleNumber: '', type: 'Car', purchaseDate: '', serviceDate: '', insuranceExpiry: '', pucExpiry: '' });
    setShowForm(true);
    setErrorMessage('');
  };

  const handleEditClick = (v) => {
    setEditingId(v.id);
    setFormData({
      name: v.name,
      vehicleNumber: v.vehicleNumber,
      type: v.type,
      purchaseDate: v.purchaseDate,
      serviceDate: v.serviceDate,
      insuranceExpiry: v.insuranceExpiry,
      pucExpiry: v.pucExpiry
    });
    setShowForm(true);
    setErrorMessage('');
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.vehicleNumber.trim()) {
      setErrorMessage('Vehicle Name and Vehicle Number are required!');
      return;
    }

    if (editingId) {
      setVehicles(vehicles.map(v =>
        v.id === editingId ? { ...v, ...formData } : v
      ));
    } else {
      const newVehicle = {
        id: Date.now(),
        ...formData
      };
      setVehicles([...vehicles, newVehicle]);
    }

    setShowForm(false);
    setFormData({ name: '', vehicleNumber: '', type: 'Car', purchaseDate: '', serviceDate: '', insuranceExpiry: '', pucExpiry: '' });
  };

  return (
    <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#222222', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Vehicles
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#737373', marginTop: '6px' }}>
            Keep track of your vehicles and important dates.
          </p>
        </div>

        <button
          onClick={handleOpenAddForm}
          style={{
            backgroundColor: '#222222',
            color: '#FFFFFF',
            padding: '12px 26px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
          }}
        >
          + Add Vehicle
        </button>
      </div>

      {/* Statistics Banner */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '36px' }}>
        <StatCard title="Total Vehicles" value={totalVehicles} color="#222222" />
        <StatCard title="Service Due" value={serviceDueCount} color="#856404" />
        <StatCard title="Insurance Expiring" value={insuranceExpiringCount} color="#9B1C1C" />
        <StatCard title="PUC Expiring" value={pucExpiringCount} color="#9B1C1C" />
      </div>

      {/* Search Input Bar */}
      <div style={{ marginBottom: '32px' }}>
        <input
          type="text"
          placeholder="🔍 Search vehicles by name or vehicle number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '480px',
            height: '50px',
            padding: '0 22px',
            borderRadius: '9999px',
            border: '1px solid #E5E3DA',
            backgroundColor: '#FFFFFF',
            outline: 'none',
            fontSize: '0.9rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
          }}
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E5E3DA',
          padding: '32px',
          marginBottom: '40px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#222222', marginBottom: '20px' }}>
            {editingId ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h3>

          {errorMessage && (
            <div style={{ color: '#9B1C1C', background: '#FDF2F2', padding: '12px 16px', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '20px', fontWeight: 700, border: '1px solid #F8B4B4' }}>
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Vehicle Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Honda City"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Vehicle Number *</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                placeholder="e.g. KA01 AB 1234"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Vehicle Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={{ width: '100%', backgroundColor: '#FAF9F5' }}
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike / Scooter</option>
                <option value="EV">Electric Vehicle</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Next Service Date</label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleInputChange}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Insurance Expiry</label>
              <input
                type="date"
                name="insuranceExpiry"
                value={formData.insuranceExpiry}
                onChange={handleInputChange}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>PUC Expiry</label>
              <input
                type="date"
                name="pucExpiry"
                value={formData.pucExpiry}
                onChange={handleInputChange}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ padding: '12px 24px', borderRadius: '9999px', backgroundColor: '#EAE8DF', color: '#222222', fontWeight: 700, fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '12px 28px', borderRadius: '9999px', backgroundColor: '#222222', color: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem' }}
              >
                {editingId ? 'Save Changes' : 'Add Vehicle'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Vehicles Grid List */}
      {filteredVehicles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: '#FFFFFF', borderRadius: '24px', color: '#737373', border: '1px solid #E5E3DA' }}>
          No vehicles found. Click "+ Add Vehicle" to register one.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredVehicles.map(v => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

