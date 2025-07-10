"use client";

import { Button } from "@/components/ui/button";
import {
  Camera,
  Edit,
  Check,
  CircleUser,
  Calendar,
  Mail,
  PenLine,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getInstructorData } from "../actionsFormador/get-user-actions";

interface UserData {
  id?: number;
  name: string;
  email: string;
  contacto: string;
  photoUrl?: string;
  birthDate: string;
  gender: string;
  bio: string;
}

const PerfilForm = () => {
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState("/images/uPro.PNG");
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    contacto: "",
    birthDate: "",
    gender: "male",
    bio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInstructorData();

        setUserData({
          id: data.id,
          name: data.nomeCompleto,
          email: data.email,
          contacto: data.contacto?.toString() || "",
          birthDate: "",
          gender: "male",
          bio: "",
          photoUrl: data.photoPerfil?.url,
        });

        setProfilePic(data.photoPerfil?.url || "/images/avatar1.jpg");
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || "Não foi possível carregar o perfil.");
      }
    };

    fetchData();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("photo", file);

        const res = await fetch("/api/uploadperfil", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Erro ao enviar imagem");

        setProfilePic(data.url);
        toast.success("Foto alterada com sucesso!");
      } catch (err) {
        console.error(err);
        toast.error("Erro ao enviar foto.");
      } finally {
        setUploading(false);
      }
    }
  };

  /* ---------- manipulação de inputs ---------- */
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- salvar alterações ---------- */
  const handleSave = async () => {
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao atualizar perfil");

      setEditMode(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar perfil");
    }
  };

  /* ---------- alternar entre visualização/edição ---------- */
  const toggleEditMode = () => {
    if (editMode) {
      handleSave();
    } else {
      setEditMode(true);
    }
  };

  /* ---------- JSX ---------- */
  return (
    <>
      <Toaster position="top-center" />
      <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
        <div className="flex flex-wrap md:flex-nowrap p-8">
          {/* FOTO */}
          <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0 md:pr-8">
            <div className="relative mb-6 group">
              <div className="relative">
                <img
                  src={profilePic}
                  alt="Foto de perfil"
                  className={`w-40 h-40 rounded-full object-cover border-4 shadow-md transition-all duration-300
                    ${
                      uploading
                        ? "border-transparent bg-gradient-to-tr from-blue-400 to-cyan-500 animate-pulse"
                        : editMode
                        ? "border-green-400"
                        : "border-blue-100"
                    }`}
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

              <h2 className="text-lg font-bold text-center mt-6 text-gray-500">
                {userData.name.toLowerCase()
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
              </h2>
              <p className="text-sm text-gray-400 text-center mt-1">
                ID: {userData.id}
              </p>

              <Button
                onClick={toggleEditMode}
                className={`mt-6 px-6 py-3 rounded-lg transition-all ${
                  editMode
                    ? "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                } text-white shadow-md hover:shadow-lg`}
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

          {/* FORMULÁRIO */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium flex items-center">
                  <CircleUser className="mr-2 text-blue-500" size={18} /> Nome
                  Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name .toLowerCase()
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    editMode
                      ? "border-blue-200 bg-white shadow-inner"
                      : "border-gray-200 bg-gray-50"
                  } rounded-lg`}
                  disabled={!editMode}
                />
              </div>

              {/* Data de nascimento */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium flex items-center">
                  <Calendar className="mr-2 text-blue-500" size={18} /> Data de
                  Nascimento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={userData.birthDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    editMode
                      ? "border-blue-200 bg-white shadow-inner"
                      : "border-gray-200 bg-gray-50"
                  } rounded-lg`}
                  disabled={!editMode}
                />
              </div>

              {/* Gênero */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium flex items-center">
                  <CircleUser className="mr-2 text-blue-500" size={18} /> Gênero
                </label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    editMode
                      ? "border-blue-200 bg-white shadow-inner"
                      : "border-gray-200 bg-gray-50"
                  } rounded-lg`}
                  disabled={!editMode}
                >
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                </select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium flex items-center">
                  <Mail className="mr-2 text-blue-500" size={18} /> E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-500"
                  disabled
                />
              </div>

              {/* Contacto */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-gray-700 font-medium flex items-center">
                  <Mail className="mr-2 text-blue-500" size={18} /> Contacto
                </label>
                <input
                  type="text"
                  name="contacto"
                  value={userData.contacto}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    editMode
                      ? "border-blue-200 bg-white shadow-inner"
                      : "border-gray-200 bg-gray-50"
                  } rounded-lg`}
                  disabled={!editMode}
                />
              </div>
            </div>

            {/* Biografia */}
            <div className="mt-6 space-y-2">
              <label className="block text-gray-700 font-medium flex items-center">
                <PenLine className="mr-2 text-blue-500" size={18} /> Biografia
              </label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  editMode
                    ? "border-blue-200 bg-white shadow-inner"
                    : "border-gray-200 bg-gray-50"
                } rounded-lg h-32`}
                disabled={!editMode}
                placeholder="Conte um pouco sobre você..."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PerfilForm;
