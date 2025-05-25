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
import Link from "next/link";

interface OrderSummaryItem {
  label: string;
  value: number;
  bold?: boolean;
  highlight?: boolean;
}

interface OrderSummaryProps {
  items: OrderSummaryItem[];
  actionLabel?: string;
  actionHref?: string;
  actionDisabled?: boolean;
  title?: string;
}

export function OrderSummary({
  items,
  actionLabel,
  actionHref,
  actionDisabled = false,
  title = "Resumen del Pedido",
}: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span
                className={
                  item.highlight ? "text-foreground" : "text-muted-foreground"
                }
              >
                {item.label}
              </span>
              <span className={item.bold ? "font-medium" : ""}>
                ${item.value.toFixed(2)}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>
              ${items.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      {actionLabel && actionHref && (
        <CardFooter>
          <Button className="w-full" disabled={actionDisabled} asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
