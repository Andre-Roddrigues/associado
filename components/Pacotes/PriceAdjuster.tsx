'use client';

import React, { useState, useEffect } from 'react';

interface PriceAdjusterProps {
  basePrice: number;
  selectedPackage: string;
}

interface PackageOption {
  id: string;
  name: string;
  percentagem: number;
}
const padrao :PackageOption = {
  id : "intermediario",
  name :"Intermediario",
  percentagem :0
}
const PriceAdjuster: React.FC<PriceAdjusterProps> = ({ basePrice, selectedPackage }) => {
  const [packageOptions, setPackageOptions] = useState<PackageOption[] | null>([padrao]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('https://backend.unitec.ac.mz/listpackage')
        const data = await response.json();
        setPackageOptions(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <span className="text-primary text-base md:text-xl lg:text-xl font-montserrat font-bold ml-2">Carregando...</span>;
  }

  if (!packageOptions) {
    return <span className="text-primary text-base md:text-xl lg:text-3xl font-montserrat font-bold ml-2">Erro ao carregar pacotes</span>;
  }

  const selectedPackageOption = packageOptions.find(
    (pkg) => pkg?.id && selectedPackage && pkg.id === selectedPackage
  );

  const adjustedPrice = selectedPackage === 'intermediario'
    ? basePrice
    : selectedPackageOption
    ? basePrice * (1 + selectedPackageOption.percentagem)
    : basePrice;

  const roundedPrice = Math.round(adjustedPrice);
  const formattedPrice = new Intl.NumberFormat('pt-PT', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedPrice); 

  return (
    <span className="text-primary text-base md:text-xl lg:text-3xl font-montserrat font-bold ml-2">
      MZN {formattedPrice}
    </span>
  );
};

export default PriceAdjuster;
