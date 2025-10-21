import React from 'react';
import { jsPDF } from 'jspdf';

const ReceiptViewer = ({ receipt }) => {
  if (!receipt) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Selecciona una compra para ver el comprobante.</p>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Comprobante #${receipt.id}`, 20, 20);

    doc.setFontSize(12);
    doc.text(`Tipo: ${receipt.type || 'Boleta/Factura'}`, 20, 30);
    doc.text(`Fecha: ${receipt.date}`, 20, 37);
    doc.text(`Cliente: ${receipt.customer?.name || 'N/A'}`, 20, 44);
    doc.text(`Email: ${receipt.customer?.email || ''}`, 20, 51);
    doc.text(`Estado envío: ${receipt.shippingStatus || 'N/D'}`, 20, 58);
    doc.text(`Total: $${receipt.total}`, 20, 65);

    // Items
    let y = 75;
    doc.text('Items:', 20, y);
    y += 7;
    receipt.items.forEach((item, idx) => {
      doc.text(
        `${idx + 1}. ${item.name} - Cantidad: ${item.qty} - Precio: $${item.price}`,
        25,
        y
      );
      y += 7;
    });

    doc.save(`comprobante-${receipt.id}.pdf`);
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
            onClick={handleDownloadPDF}
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptViewer;
