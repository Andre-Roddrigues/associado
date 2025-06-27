"use client"
import { Button } from '@/components/ui/button';
import { Camera, Edit, Check, CircleUser, Calendar, Mail, PenLine } from 'lucide-react';
import React, { useState } from 'react';

const PerfilForm = () => {
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState("/images/avatar1.jpg");
  const [userData, setUserData] = useState({
    name: "André André",
    birthDate: "1985-05-15",
    gender: "male",
    email: "andre.andre@example.com",
    bio: "Desenvolvedor web apaixonado por criar soluções inovadoras. Adoro viajar e aprender novas culturas."
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePic(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
      <div className="profile-section flex flex-wrap md:flex-nowrap p-8">
        {/* Profile Picture Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0 md:pr-8">
          <div className="relative mb-6 group">
            <div className="relative">
              <img 
                src={profilePic} 
                alt="Foto de perfil" 
                className={`w-40 h-40 rounded-full object-cover border-4 ${editMode ? 'border-blue-400' : 'border-blue-100'} shadow-md transition-all duration-300`}
              />
              {editMode && (
                <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <Camera className="text-blue-600" size={20} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
            <h2 className="text-lg font-bold text-center mt-6 text-gray-500">{userData.name}</h2>
            
            <Button
              onClick={toggleEditMode}
              className={`mt-6 px-6 py-3 rounded-lg transition-all ${editMode ? 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'} text-white shadow-md hover:shadow-lg`}
            >
              {editMode ? (
                <>
                  <Check className="mr-2" size={18} />
                  Salvar Alterações
                </>
              ) : (
                <>
                  <Edit className="mr-2" size={18} />
                  Editar Perfil
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Personal Info Section */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium flex items-center">
                <CircleUser className="mr-2 text-blue-500" size={18} />
                Nome Completo
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${editMode ? 'border-blue-200 bg-white shadow-inner' : 'border-gray-200 bg-gray-50'} rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all`}
                  disabled={!editMode}
                />
                {!editMode && (
                  <button 
                    onClick={toggleEditMode}
                    className="absolute right-3 top-3 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                )}
              </div>
            </div>
            
            {/* Birth Date */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium flex items-center">
                <Calendar className="mr-2 text-blue-500" size={18} />
                Data de Nascimento
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  name="birthDate"
                  value={userData.birthDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${editMode ? 'border-blue-200 bg-white shadow-inner' : 'border-gray-200 bg-gray-50'} rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all`}
                  disabled={!editMode}
                />
                {!editMode && (
                  <button 
                    onClick={toggleEditMode}
                    className="absolute right-3 top-3 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                )}
              </div>
            </div>
            
            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium flex items-center">
                <CircleUser className="mr-2 text-blue-500" size={18} />
                Gênero
              </label>
              <div className="relative">
                <select 
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${editMode ? 'border-blue-200 bg-white shadow-inner' : 'border-gray-200 bg-gray-50'} rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all appearance-none`}
                  disabled={!editMode}
                >
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                </select>
                {!editMode && (
                  <button 
                    onClick={toggleEditMode}
                    className="absolute right-3 top-3 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                )}
              </div>
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium flex items-center">
                <Mail className="mr-2 text-blue-500" size={18} />
                E-mail
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${editMode ? 'border-blue-200 bg-white shadow-inner' : 'border-gray-200 bg-gray-50'} rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all`}
                  disabled={!editMode}
                />
                <span className="absolute right-3 top-3 text-green-500">
                  <Check size={18} />
                </span>
              </div>
            </div>
          </div>
          
          {/* Bio */}
          <div className="mt-6 space-y-2">
            <label className="block text-gray-700 font-medium flex items-center">
              <PenLine className="mr-2 text-blue-500" size={18} />
              Biografia
            </label>
            <div className="relative">
              <textarea 
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${editMode ? 'border-blue-200 bg-white shadow-inner' : 'border-gray-200 bg-gray-50'} rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all h-32`}
                disabled={!editMode}
              />
              {!editMode && (
                <button 
                  onClick={toggleEditMode}
                  className="absolute right-3 top-3 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilForm;