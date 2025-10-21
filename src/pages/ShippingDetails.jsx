import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShippingForm from '../components/forms/ShippingForm';
import ReceiptViewer from '../components/user/ReceiptViewer';

const ShippingDetails = () => {
  const { purchaseId } = useParams();
  const [address, setAddress] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    // Datos de ejemplo mientras no haya backend
    const exampleAddress = {};
    const exampleReceipts = [
      {
        id: 1,
        date: '2025-10-20',
        customer: { name: 'Cesar', email: 'cesar@ejemplo.com' },
        items: [{ name: 'Producto A', qty: 1, price: 50 }],
        total: 50,
        type: 'Boleta',
        shippingStatus: 'En tránsito',
      },
      {
        id: 2,
        date: '2025-10-18',
        customer: { name: 'Cesar', email: 'cesar@ejemplo.com' },
        items: [{ name: 'Producto B', qty: 2, price: 30 }],
        total: 60,
        type: 'Factura',
        shippingStatus: 'Entregado',
      },
    ];

    setAddress(exampleAddress);
    setReceipts(exampleReceipts);

    // Selecciona el purchaseId de la URL si existe
    if (purchaseId) {
      const idNum = Number(purchaseId);
      const found = exampleReceipts.find(r => r.id === idNum);
      if (found) setSelectedReceipt(found);
    } else {
      setSelectedReceipt(exampleReceipts[0]);
    }
  }, [purchaseId]);

  const handleAddressSave = (data) => setAddress(data);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sección principal */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
          {selectedReceipt ? (
            <ShippingForm
              initialData={address || {}}
              onSave={handleAddressSave}
              purchaseId={selectedReceipt.id}
            />
          ) : (
            <p className="text-gray-600">
              Selecciona un comprobante antes de registrar la dirección
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Comprobantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {receipts.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedReceipt(r)}
                className={`text-left p-4 rounded border ${
                  selectedReceipt?.id === r.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200'
                }`}
                aria-pressed={selectedReceipt?.id === r.id}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">
                      Orden #{r.id} • {r.type}
                    </div>
                    <div className="text-sm text-gray-600">{r.date}</div>
                  </div>
                  <div className="text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        r.shippingStatus === 'Entregado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {r.shippingStatus}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  Total: ${r.total}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Aside */}
      <aside className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Vista del Comprobante</h3>
          {selectedReceipt ? (
            <ReceiptViewer receipt={selectedReceipt} />
          ) : (
            <p className="text-gray-600">Selecciona un comprobante para ver detalles</p>
          )}
        </div>
      </aside>
    </div>
  );
};

export default ShippingDetails;
