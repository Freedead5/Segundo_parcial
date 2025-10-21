const express = require('express');
const cors = require('cors');

// Importar funciones y rutas
const { getCustomers, getPurchasesByCustomer, getReceipts } = require('./models/Store');
const addressesRoutes = require('./routes/addresses');
const shipmentRoutes = require('./routes/shipments');
const purchaseRoutes = require('./routes/purchases');
const uploadReceiptRoutes = require('./routes/uploadreceipts');

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Rutas principales ---
app.use('/api/addresses', addressesRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/uploadreceipt', uploadReceiptRoutes);

// --- Rutas de prueba / compatibilidad ---
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error obteniendo clientes:', error);
    res.status(500).json({ error: 'Error obteniendo clientes' });
  }
});

app.get('/api/customer-purchases/:customerId', async (req, res) => {
  // Cambié el endpoint para evitar conflicto con /api/purchases
  try {
    const purchases = await getPurchasesByCustomer(req.params.customerId);
    res.json(purchases);
  } catch (error) {
    console.error('Error obteniendo compras:', error);
    res.status(500).json({ error: 'Error obteniendo compras' });
  }
});

app.get('/api/receipts', async (req, res) => {
  try {
    const receipts = await getReceipts();
    res.json(receipts);
  } catch (error) {
    console.error('Error obteniendo comprobantes:', error);
    res.status(500).json({ error: 'Error obteniendo comprobantes' });
  }
});

// --- Servidor ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
