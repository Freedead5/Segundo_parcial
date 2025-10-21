import React from 'react';
import { Link } from 'react-router-dom';

const PurchaseCard = ({ purchase, onViewReceipt }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Orden #{purchase.id}</h3>
          <p className="text-gray-600">Destinatario: {purchase.receiver_name}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${purchase.shipping_status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {purchase.shipping_status === 'delivered' ? 'Entregado' : 'Pendiente'}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-gray-700">Dirección: {purchase.shipping_address}</p>
        <div className="mt-4 flex space-x-2">
          {/* Botón para subir comprobante */}
          <Link
            to={`/upload-receipt/${purchase.id}`}
            className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Subir Comprobante
          </Link>

          {/* Botón para ver detalles / descargar PDF */}
          <button
            onClick={onViewReceipt}
            className="flex-1 text-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Descargar Comprobante
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCard;
