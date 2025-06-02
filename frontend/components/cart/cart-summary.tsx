"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CartItem,
  CartSummary as CartSummaryType,
} from "@/contexts/CartContext";
import {
  getActionButtonClass,
  getCartSummaryCardClass,
  getTotalContainerClass,
} from "@/lib/utils";
import Link from "next/link";

interface CartSummaryProps {
  items: CartItem[];
  taxRate?: number;
  title?: string;
  actionLabel?: string;
  actionHref?: string;
  onCheckout?: () => void;
}

export function CartSummary({
  items,
  taxRate = 0.16, // Actualizado a 16% para coincidir con el context
  title = "Resumen del Pedido",
  actionLabel = "Proceder al pago",
  actionHref = "/client/checkout",
  onCheckout,
}: CartSummaryProps) {
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // Calculate tax
  const tax = subtotal * taxRate;

  // Calculate total
  const total = subtotal + tax;

  // Check if cart is empty
  const isEmpty = items.length === 0;

  // Create summary object
  const summary: CartSummaryType = {
    subtotal,
    tax,
    total,
  };

  // Format summary items for display
  const summaryItems = [
    { label: "Subtotal", value: summary.subtotal },
    {
      label: `Impuesto (${(taxRate * 100).toFixed(0)}%)`,
      value: summary.tax || 0,
    },
  ];

  const handleAction = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <Card className={getCartSummaryCardClass()}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">
                {item.label}
              </span>
              <span className="font-semibold text-foreground">
                ₡{item.value.toFixed(0)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className={getTotalContainerClass()}>
          <span className="font-bold text-lg text-foreground">Total</span>
          <span className="font-bold text-xl text-primary">
            ₡{summary.total.toFixed(0)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        {actionHref ? (
          <Button
            className={getActionButtonClass(isEmpty)}
            disabled={isEmpty}
            asChild
            onClick={handleAction}
          >
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : (
          <Button
            className={getActionButtonClass(isEmpty)}
            disabled={isEmpty}
            onClick={handleAction}
          >
            {actionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
