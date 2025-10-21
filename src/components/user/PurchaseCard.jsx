import React from 'react'
import { Link } from 'react-router-dom'

const PurchaseCard = ({ purchase }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Orden #{purchase.id}</h3>
          <p className="text-gray-600">{purchase.date}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${purchase.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {purchase.status === 'delivered' ? 'Entregado' : 'Pendiente'}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-gray-700">Total: ${purchase.total}</p>
        <div className="mt-4 flex space-x-2">
          <Link to={`/shipping/${purchase.id}`} className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Ver Envío / Comprobante
          </Link>
          <Link to={`/shipping/${purchase.id}`} className="inline-block text-sm text-blue-600 underline">
            Detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PurchaseCard