"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  isPromo?: boolean;
  onAddToCart: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageSrc,
  isPromo = false,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image src={imageSrc} alt={name} fill className="object-cover" />
        {isPromo && (
          <div className="absolute top-2 right-2">
            <Badge variant="naranja">Promoción</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
        <CardDescription className="mt-2 line-clamp-2 text-sm">
          {description}
        </CardDescription>
        <div className="mt-2 font-bold text-primary">${price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="cafe"
          size="sm"
          className="w-full"
          onClick={() => onAddToCart(id)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir al pedido
        </Button>
      </CardFooter>
    </Card>
  );
}
