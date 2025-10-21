const { pool } = require('./Store'); // usa la conexión existente

// === Insertar un nuevo envío ===
async function createShipment({ purchase_id, receiver_name, shipping_address, shipping_status = 'pending', notes = null }) {
  const [result] = await pool.query(
    `INSERT INTO shipments (purchase_id, receiver_name, shipping_address, shipping_status, notes)
     VALUES (?, ?, ?, ?, ?)`,
    [purchase_id, receiver_name, shipping_address, shipping_status, notes]
  );
  
  return {
    id: result.insertId,
    purchase_id,
    receiver_name,
    shipping_address,
    shipping_status,
    notes
  };
}

// === Actualizar el estado de envío ===
async function updateShipmentStatus(id, status) {
  await pool.query(
    `UPDATE shipments SET shipping_status = ? WHERE id = ?`,
    [status, id]
  );
  return { id, shipping_status: status };
}

// === Registrar la fecha de envío ===
async function markAsShipped(id, shipped_at = new Date()) {
  await pool.query(
    `UPDATE shipments SET shipping_status = 'shipped', shipped_at = ? WHERE id = ?`,
    [shipped_at, id]
  );
  return { id, shipping_status: 'shipped', shipped_at };
}

// === Registrar la fecha de entrega ===
async function markAsDelivered(id, delivered_at = new Date()) {
  await pool.query(
    `UPDATE shipments SET shipping_status = 'delivered', delivered_at = ? WHERE id = ?`,
    [delivered_at, id]
  );
  return { id, shipping_status: 'delivered', delivered_at };
}

module.exports = {
  createShipment,
  updateShipmentStatus,
  markAsShipped,
  markAsDelivered
};
