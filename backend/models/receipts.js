const pool = require('../db.js'); // tu conexión a MySQL

async function saveReceipt(shipmentId, filePath) {
  const sql = 'INSERT INTO receipts (purchase_id, receiver_name, notes) SELECT purchase_id, receiver_name, ? FROM shipments WHERE id = ?';
  const params = [filePath, shipmentId];
  await pool.query(sql, params);
}

module.exports = { saveReceipt };
