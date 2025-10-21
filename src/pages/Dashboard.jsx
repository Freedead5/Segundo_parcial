import React, { useState, useEffect } from 'react';
import PurchaseList from '../components/user/PurchaseList';
import ShippingForm from '../components/forms/ShippingForm';

const samplePurchases = [
  { id: 1, date: '2025-10-20', status: 'delivered', total: 50.0 },
  { id: 2, date: '2025-10-18', status: 'pending', total: 60.0 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('purchases');
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:3001/api/purchases');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPurchases(data);
      } catch (err) {
        console.error('Error fetching purchases:', err);
        setError('');
        setPurchases(samplePurchases);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Usuario</h1>

      <div className="mb-6">
        <div className="flex space-x-4 border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'purchases' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('purchases')}
          >
            Mis Compras
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'shipping' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('shipping')}
          >
            Dirección de Envío
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-6 rounded shadow text-gray-600">Cargando compras...</div>
      ) : (
        <>
          {error && <div className="mb-4 text-sm text-yellow-700">{error}</div>}

          {activeTab === 'purchases' ? (
            <PurchaseList purchases={purchases} />
          ) : (
            <ShippingForm />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;