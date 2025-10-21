const express = require('express');
const multer = require('multer');
const path = require('path');
const { saveReceipt } = require('../models/receipts'); // función para guardar info en DB

const router = express.Router();

// Configuración de Multer para guardar archivos en "uploads/"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // carpeta donde se guardan los PDFs
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // nombre único
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Solo se permiten archivos PDF'), false);
  }
});

// POST /api/upload-receipt/:shipmentId
router.post('/:shipmentId', upload.single('receipt'), async (req, res) => {
  try {
    const shipmentId = req.params.shipmentId;
    const filePath = req.file.path;

    // Guardar en la base de datos
    await saveReceipt(shipmentId, filePath);

    res.json({ message: 'Receipt subido correctamente', path: filePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error subiendo el receipt' });
  }
});

module.exports = router;
