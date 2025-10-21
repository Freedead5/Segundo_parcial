import React from 'react';
import PurchaseCard from './PurchaseCard';

const PurchaseList = () => {
  // Datos de ejemplo
  const purchases = [
    {
      id: 1,
      date: '2023-10-21',
      status: 'delivered',
      total: 99.99,
      items: ['Producto 1', 'Producto 2']
    },
    {
      id: 2,
      date: '2023-10-20',
      status: 'pending',
      total: 149.99,
      items: ['Producto 3']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {purchases.map((purchase) => (
        <PurchaseCard key={purchase.id} purchase={purchase} />
      ))}
    </div>
  );
};

export default PurchaseList;