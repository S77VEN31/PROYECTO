"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/types/products";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  className?: string;
}

export function ProductCard({
  product,
  onSelect,
  className,
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer transition-all hover:shadow-md",
        product.available === false && "opacity-70 pointer-events-none",
        className
      )}
      onClick={() => onSelect?.(product)}
    >
      <div className="aspect-square relative">
        <Image
          src={product.image || product.imageSrc}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.available === false && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="text-sm font-medium text-destructive">
              No disponible
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-1">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          {product.category && (
            <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
              {Array.isArray(product.category)
                ? product.category[0]
                : product.category}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

interface ProductGridProps {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
  emptyState?: React.ReactNode;
  className?: string;
}

export function ProductGrid({
  products,
  onSelectProduct,
  emptyState,
  className,
}: ProductGridProps) {
  if (products.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
}
