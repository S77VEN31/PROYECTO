"use client";

import { Product } from "colori-platform-shared";
import { ProductCard } from "./product-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ProductsGridProps {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
  showInactive?: boolean;
}

export function ProductsGrid({
  products,
  onSelectProduct,
  showInactive = true,
}: ProductsGridProps) {
  // Filtrar productos inactivos si showInactive es false
  const filteredProducts = showInactive
    ? products
    : products.filter((product) => product.active !== false);

  if (filteredProducts.length === 0) {
    return (
      <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-foreground">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No hay productos disponibles</AlertTitle>
        <AlertDescription>
          No se encontraron productos en esta categoría. Por favor, intenta con otra categoría.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
} 