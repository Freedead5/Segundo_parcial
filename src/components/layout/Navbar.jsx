import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Mi Tienda Online</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-600">Inicio</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Mis Compras</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Perfil</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;