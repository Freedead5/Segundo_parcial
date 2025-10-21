import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UploadReceipt = () => {
  const { purchaseId } = useParams(); // 🔹 esto toma el ID de la URL
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Selecciona un archivo");

    try {
      const formData = new FormData();
      formData.append('receipt', file);

      const res = await fetch(`http://localhost:5000/api/uploadreceipt/${purchaseId}`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Error al subir el comprobante');

      alert('Comprobante subido correctamente');
    } catch (err) {
      console.error(err);
      alert('Error al subir el comprobante');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Subir Comprobante</button>
    </form>
  );
};

export default UploadReceipt;
