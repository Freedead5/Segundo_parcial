const express = require('express');
const { getAllPurchases } = require('../models/purchases');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const purchases = await getAllPurchases();
    res.json(purchases);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
});

module.exports = router;

