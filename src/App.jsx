//npm create vite@latest my-project
//cd my-project
//npm install -g tailwindcss@3.4.13
//tailwindcss init -p

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Dashboard from './pages/Dashboard'
import ShippingDetails from './pages/ShippingDetails'
import PurchaseList from './components/user/PurchaseList';
import UploadReceipt from './components/user/UploadReceipt';

import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shipping" element={<ShippingDetails />} />
            <Route path="/shipping/:purchaseId" element={<ShippingDetails />} />
            <Route path="/purchases" element={<PurchaseList />} />
            <Route path="/upload-receipt/:purchaseId" element={<UploadReceipt />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

