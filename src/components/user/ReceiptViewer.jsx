import React from 'react';

/**
 * Componente para visualizar y descargar un comprobante simple.
 * Props:
 *  - receipt: { id, date, customer, items: [{name, qty, price}], total, type, shippingStatus }
 */
const ReceiptViewer = ({ receipt }) => {
  if (!receipt) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Selecciona una compra para ver el comprobante.</p>
      </div>
    );
  }

  const handleDownload = () => {
    const data = JSON.stringify(receipt, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprobante-${receipt.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const html = `
      <html>
        <head>
          <title>Comprobante ${receipt.id}</title>
          <style>
            body{font-family: Arial, sans-serif;padding:20px;}
            h1{color:#1f2937}
            table{width:100%;border-collapse:collapse;margin-top:10px}
            th,td{border:1px solid #ddd;padding:8px;text-align:left}
          </style>
        </head>
        <body>
          <h1>Comprobante ${receipt.id}</h1>
          <p><strong>Tipo:</strong> ${receipt.type || 'Boleta/Factura'}</p>
          <p><strong>Fecha:</strong> ${receipt.date}</p>
          <p><strong>Cliente:</strong> ${receipt.customer?.name || 'N/A'}</p>
          <h2>Items</h2>
          <table>
            <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th></tr></thead>
            <tbody>
              ${receipt.items.map(i => `<tr><td>${i.name}</td><td>${i.qty}</td><td>$${i.price}</td></tr>`).join('')}
            </tbody>
          </table>
          <h3>Total: $${receipt.total}</h3>
          <p><strong>Estado envío:</strong> ${receipt.shippingStatus || 'N/D'}</p>
        </body>
      </html>
    `;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      w.print();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Comprobante #{receipt.id}</h2>
          <p className="text-sm text-gray-600">{receipt.type} • {receipt.date}</p>
          <p className="mt-2 text-gray-700"><strong>Cliente:</strong> {receipt.customer?.name || 'N/A'}</p>
          <p className="text-gray-600">{receipt.customer?.email || ''}</p>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            aria-label="Descargar comprobante"
          >
            Descargar
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
            aria-label="Imprimir comprobante"
          >
            Imprimir
          </button>
        </div>
      </div>

      <div className="mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-2">Producto</th>
              <th className="pb-2">Cantidad</th>
              <th className="pb-2">Precio</th>
            </tr>
          </thead>
          <tbody>
            {receipt.items.map((it, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2">{it.name}</td>
                <td className="py-2">{it.qty}</td>
                <td className="py-2">${it.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">Estado envío: <span className="font-medium text-gray-800">{receipt.shippingStatus || 'N/D'}</span></div>
          <div className="text-lg font-semibold">Total: ${receipt.total}</div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptViewer;