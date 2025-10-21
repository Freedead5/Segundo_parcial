// backend/models/purchases.js
import pool from "../db.js";

export async function getAllPurchases() {
  const [rows] = await pool.query("SELECT * FROM shipments");
  return rows;
}
