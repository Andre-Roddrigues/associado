import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

interface CardProps {
  title: string;
  description: string;
  icon: StaticImageData | string;
  bgColor: string;
}

function CardInfo({ title, description, icon, bgColor }: CardProps) {
  return (
    <Card className="w-full h-full min-w-[214px] md:max-w-96 lg:max-w-64 flex flex-col gap-4 px-6  py-9 bg-background drop-shadow-xl shadow-">
      <CardHeader
        className={clsx(
          "flex items-center justify-center h-20 w-20 rounded-full p-4",
          `${bgColor}` // Classe gerada dinamicamente
        )}
      >
        <Image src={icon} alt="" />
      </CardHeader>
      <CardTitle className="font-bold text-sm text-muted-foreground">
        {title}
      </CardTitle>
      <CardContent className="text-xs text-muted-foreground p-0">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

export default CardInfo;
