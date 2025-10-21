const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Montar rutas (asegúrate de que exista backend/routes/receipts.js)
app.use('/api/receipts', require('./routes/receipts'));

// Ruta de prueba de BD (requiere backend/config/db.js)
try {
  const pool = require('./config/db');
  app.get('/test-db', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT 1 as ok');
      res.json({ ok: rows[0].ok });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
} catch (err) {
  // Si no existe config/db.js, la ruta de prueba no será montada
  console.warn('No se pudo montar /test-db: ', err.message);
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));