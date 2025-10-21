const express = require('express')
const router = express.Router()
const { createShipment } = require('../models/shipments')

router.post('/', async (req, res) => {
  console.log('BODY RECIBIDO:', req.body);
  try {
    const shipmentData = req.body
    const shipment = await createShipment(shipmentData)
    res.status(201).json(shipment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al guardar el envío' })
  }
})

module.exports = router
