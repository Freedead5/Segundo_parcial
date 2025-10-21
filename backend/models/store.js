const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store_receipts', // tu base de datos en Laragon
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// === FUNCIONES ===

// Obtener todos los clientes
async function getCustomers() {
  const [rows] = await pool.query('SELECT * FROM customers');
  return rows;
}

// Obtener las compras de un cliente
async function getPurchasesByCustomer(customerId) {
  const [rows] = await pool.query(
    'SELECT * FROM purchases WHERE customer_id = ?',
    [customerId]
  );
  return rows;
}

// Obtener los comprobantes (receipts)
async function getReceipts() {
  const [rows] = await pool.query('SELECT * FROM receipts');
  return rows;
}

// Obtener todas las compras
async function getAllPurchases() {
  try {
    const [rows] = await pool.query('SELECT * FROM purchases');
    return rows;
  } catch (err) {
    console.error('Error obteniendo compras:', err);
    throw err;
  }
}

module.exports = {
  getCustomers,
  getPurchasesByCustomer,
  getReceipts,
  getAllPurchases
};
