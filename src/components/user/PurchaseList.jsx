import React, { useEffect, useState } from 'react';
import PurchaseCard from './PurchaseCard';
import { jsPDF } from 'jspdf';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/purchases');
        if (!res.ok) throw new Error('Error al cargar las compras');
        const data = await res.json();
        setPurchases(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const handleViewReceipt = (purchase) => {
    const doc = new jsPDF();
    let y = 20;

    // Encabezado
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Comprobante #${purchase.id}`, 105, y, { align: 'center' });
    y += 10;

    // Información del cliente
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Destinatario: ${purchase.receiver_name}`, 10, y);
    y += 7;
    doc.text(`Dirección: ${purchase.shipping_address}`, 10, y);
    y += 7;
    doc.text(`Estado envío: ${purchase.shipping_status}`, 10, y);
    y += 10;

    // Tabla de items
    if (purchase.items && purchase.items.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Items', 10, y);
      y += 7;

      // Cabecera de tabla
      doc.setFillColor(220, 220, 220);
      doc.rect(10, y, 190, 8, 'F'); // Fondo gris
      doc.setFont('helvetica', 'bold');
      doc.text('Producto', 12, y + 6);
      doc.text('Cantidad', 110, y + 6);
      doc.text('Precio', 160, y + 6);
      y += 8;

      // Items
      doc.setFont('helvetica', 'normal');
      purchase.items.forEach((item) => {
        doc.text(item.name, 12, y + 6);
        doc.text(String(item.qty), 110, y + 6);
        doc.text(`$${item.price.toFixed(2)}`, 160, y + 6);
        y += 8;
      });

      // Total
      y += 5;
      const total = purchase.items.reduce((sum, item) => sum + item.qty * item.price, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total: $${total.toFixed(2)}`, 10, y);
    }

    // Pie de página
    y += 15;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Gracias por su compra.', 105, y, { align: 'center' });

    doc.save(`comprobante-${purchase.id}.pdf`);
  };

  if (loading) return <p>Cargando compras...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {purchases.map((purchase) => (
        <PurchaseCard
          key={purchase.id}
          purchase={purchase}
          onViewReceipt={() => handleViewReceipt(purchase)}
        />
      ))}
    </div>
  );
};

export default PurchaseList;
