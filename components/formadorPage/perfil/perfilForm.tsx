"use client"
import { Button } from '@/components/ui/button';
import { Camera, Edit, Check, CircleUser, Calendar, Mail, PenLine } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface UserData {
  sub?: string;
  name: string;
  birthDate: string;
  gender: string;
  email: string;
  bio: string;
}

interface UserFromToken {
  sub: string;
  email: string;
  isAuthenticated: boolean;
}

const PerfilForm = () => {
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState("/images/avatar1.jpg");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    birthDate: "",
    gender: "male",
    email: "",
    bio: ""
  });

  // Carrega dados do usuário do token
  useEffect(() => {
    const loadUserFromToken = async () => {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const user = await res.json();
          setUserData(prev => ({
            ...prev,
            sub: user.sub,
            name: prev.name || 'Unitec Academy',
            email: user.email || '',
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do token:', error);
      }
    };
  
    loadUserFromToken();
  }, []);
  

  const loadUserData = async () => {
    try {
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const tokenUser: UserFromToken = await response.json();
        
        // Atualiza o userData com os dados do token
        setUserData(prev => ({
          ...prev,
          sub: tokenUser.sub,
          email: tokenUser.email,
          // Mantém outros campos se já existirem, senão usa valores padrão
          name: prev.name || "Usuário",
          birthDate: prev.birthDate || "",
          bio: prev.bio || "Adicione uma biografia para se apresentar melhor."
        }));
      } else {
        console.error('Erro ao carregar dados do usuário');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async () => {
    try {
      // Aqui você pode implementar a lógica para salvar os dados
      // Por exemplo, enviar para uma API
      console.log('Salvando dados:', userData);
      
      // Simula uma chamada à API
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      if (response.ok) {
        setEditMode(false);
        console.log('Perfil atualizado com sucesso!');
      } else {
        console.error('Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      handleSave();
    } else {
      setEditMode(true);
    }
  };

  // if (loading) {
  //   return (
  //     <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
  //       <div className="p-8">
  //         <div className="animate-pulse">
  //           <div className="flex flex-wrap md:flex-nowrap">
  //             <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
  //               <div className="w-40 h-40 bg-gray-300 rounded-full mb-4"></div>
  //               <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
  //               <div className="h-10 bg-gray-300 rounded w-40"></div>
  //             </div>
  //             <div className="w-full md:w-2/3 space-y-4">
  //               <div className="h-12 bg-gray-300 rounded"></div>
  //               <div className="h-12 bg-gray-300 rounded"></div>
  //               <div className="h-12 bg-gray-300 rounded"></div>
  //               <div className="h-32 bg-gray-300 rounded"></div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

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
            <h2 className="text-lg font-bold text-center mt-6 text-gray-500">{userData.name || 'Usuário'}</h2>
            <p className="text-sm text-gray-400 text-center mt-1">ID: {userData.sub}</p>
            
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
                    onClick={() => setEditMode(true)}
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
                    onClick={() => setEditMode(true)}
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
                    onClick={() => setEditMode(true)}
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
                  className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg transition-all text-gray-500"
                  disabled={true} // Email sempre desabilitado pois vem do token
                />
                <span className="absolute right-3 top-3 text-green-500" title="Email verificado">
                  <Check size={18} />
                </span>
              </div>
              <p className="text-xs text-gray-500">O email não pode ser alterado pois é usado para autenticação.</p>
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
                placeholder="Conte um pouco sobre você..."
              />
              {!editMode && (
                <button 
                  onClick={() => setEditMode(true)}
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