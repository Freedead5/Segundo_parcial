import React, { useState } from 'react';

/**
 * Formulario para confirmar recepción de un pedido.
 * Props:
 *  - purchaseId
 *  - onConfirm(purchaseId, data)
 */
// ...existing code...
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!received) {
    setSuccess(false);
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:3001/api/receipts/confirm/${purchaseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        receiver: receiver || 'Desconocido',
        notes,
      }),
    });

    if (!response.ok) throw new Error('Error al confirmar recepción');
    
    setSuccess(true);
    if (onConfirm) onConfirm(purchaseId, { received, receiver, notes });
  } catch (error) {
    console.error('Error:', error);
    setSuccess(false);
  }
};
// ...existing code...
const ConfirmationForm = ({ purchaseId, onConfirm }) => {
  const [received, setReceived] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!received) {
      setSuccess(false);
      return;
    }
    const payload = {
      received,
      receiver: receiver || 'Desconocido',
      notes,
      receivedAt: new Date().toISOString(),
    };
    if (onConfirm) onConfirm(purchaseId, payload);
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold">Confirmar Recepción</h3>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={received}
          onChange={(e) => setReceived(e.target.checked)}
          className="h-4 w-4 text-blue-600"
          aria-label="Marcar como recibido"
        />
        <span className="text-sm text-gray-700">He recibido el pedido</span>
      </label>

      <div>
        <label className="block text-sm text-gray-600">Nombre de quien recibe</label>
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 p-2"
          placeholder="Nombre"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Notas (opcional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 p-2"
          rows="3"
        />
      </div>

      <div className="flex items-center space-x-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirmar
        </button>
        <button
          type="button"
          onClick={() => { setReceived(false); setReceiver(''); setNotes(''); setSuccess(null); }}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Limpiar
        </button>
      </div>

      {success === false && <p className="text-sm text-red-600">Marca la casilla para confirmar.</p>}
      {success === true && <p className="text-sm text-green-600">Recepción confirmada.</p>}
    </form>
  );
};

export default ConfirmationForm;