"use client"
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600"
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
