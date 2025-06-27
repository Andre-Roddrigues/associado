"use client";

import React from "react";
import { ArrowUp, AlertCircle } from "lucide-react";


interface CardData {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
}

interface CardsFormadorGridProps {
  cards: ReadonlyArray<CardData>
}

export default function CardsFormador({ cards }: CardsFormadorGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${card.iconBg}`}>
              {card.icon}
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="text-sm text-muted-foreground font-bold">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
