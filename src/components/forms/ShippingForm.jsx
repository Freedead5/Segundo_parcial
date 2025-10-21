import { useState, useEffect } from 'react'

function ShippingForm({ initialData = {}, onSave }) {
  const [formData, setFormData] = useState({
    purchase_id: '',
    address: initialData.street || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zipCode: initialData.zip || '',
    phone: initialData.phone || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Usamos purchase_id escrito por el usuario
    const payload = {
      purchase_id: formData.purchase_id,
      receiver_name: formData.address,
      shipping_address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}`,
      shipping_status: 'pending',
      notes: ''
    }

    try {
      const res = await fetch('http://localhost:5000/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Error al guardar el envío')

      const data = await res.json()
      alert('Dirección de envío guardada correctamente')

      if (onSave) onSave(formData)
    } catch (err) {
      console.error(err)
      alert('Error al guardar la dirección')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Número de Compra</label>
        <input
          type="text"
          name="purchase_id"
          value={formData.purchase_id}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="ID de la compra"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dirección</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Calle y número"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ciudad</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ciudad"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado / Provincia</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Estado o provincia"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Código Postal</label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Código postal"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Teléfono"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Guardar Dirección
      </button>
    </form>
  )
}

export default ShippingForm
