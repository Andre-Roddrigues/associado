import React from 'react';

const PerfilHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-user-circle text-blue-600 text-2xl"></i>
          <h1 className="text-xl font-bold text-blue-600">UserProfile</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-blue-600 font-medium">Dashboard</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Perfil</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Configurações</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Ajuda</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-600 hover:text-blue-600">
            <i className="fas fa-bell text-xl"></i>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className="md:hidden text-gray-600">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default PerfilHeader;