const { pool } = require('./Store'); // usa la conexión existente

// === Obtener todas las direcciones ===
async function getAllAddresses() {
  const [rows] = await pool.query('SELECT * FROM addresses');
  return rows;
}

// === Obtener direcciones por cliente ===
async function getAddressesByCustomer(customerId) {
  const [rows] = await pool.query(
    'SELECT * FROM addresses WHERE customer_id = ?',
    [customerId]
  );
  return rows;
}

// === Insertar una nueva dirección ===
async function createAddress({ customer_id, street, city, state, zip_code }) {
  const [result] = await pool.query(
    `INSERT INTO addresses (customer_id, street, city, state, zip_code)
     VALUES (?, ?, ?, ?, ?)`,
    [customer_id, street, city, state, zip_code]
  );
  return { id: result.insertId, customer_id, street, city, state, zip_code };
}

// === Eliminar una dirección ===
async function deleteAddress(id) {
  await pool.query('DELETE FROM addresses WHERE id = ?', [id]);
  return { message: 'Dirección eliminada correctamente' };
}

module.exports = {
  getAllAddresses,
  getAddressesByCustomer,
  createAddress,
  deleteAddress
};
