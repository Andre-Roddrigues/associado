"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/ModalPopup.module.css';

interface ModalPopupProps {
  imageUrl: any;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
 
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <Image src={imageUrl} alt="Modal Image" width={900} height={500} />
      </div>
    </div>
  );
};

export default ModalPopup;
