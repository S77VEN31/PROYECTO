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
import { CartItem, CartSummary as CartSummaryType } from "@/types/cart";
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
  taxRate = 0.07, // Default to 7%
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

  // Add additional items if they exist
  if (summary.shipping) {
    summaryItems.push({ label: "Envío", value: summary.shipping });
  }

  if (summary.discount) {
    summaryItems.push({ label: "Descuento", value: -summary.discount });
  }

  const handleAction = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-muted-foreground">{item.label}</span>
              <span>${item.value.toFixed(2)}</span>
            </div>
          ))}
          <Separator className="my-2" />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {actionHref ? (
          <Button
            className="w-full"
            disabled={isEmpty}
            asChild
            onClick={handleAction}
          >
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : (
          <Button className="w-full" disabled={isEmpty} onClick={handleAction}>
            {actionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
