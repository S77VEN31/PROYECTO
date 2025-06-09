"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentMethod } from "colori-platform-shared";
import { CreditCard, DollarSign, Smartphone } from "lucide-react";
import { useState } from "react";

interface PaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (paymentMethod: PaymentMethod | null) => void;
  orderNumber: string;
  customerName: string;
  total: number;
}

/**
 * Dialog para seleccionar método de pago al completar una orden
 */
export function PaymentMethodDialog({
  open,
  onOpenChange,
  onConfirm,
  orderNumber,
  customerName,
  total,
}: PaymentMethodDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  /**
   * Handle form submission
   */
  const handleConfirm = () => {
    onConfirm(selectedMethod);
    setSelectedMethod(null); // Reset for next time
  };

  /**
   * Handle dialog close
   */
  const handleCancel = () => {
    setSelectedMethod(null);
    onOpenChange(false);
  };

  /**
   * Get payment method display info
   */
  const getPaymentMethodInfo = (method: PaymentMethod | null) => {
    switch (method) {
      case PaymentMethod.CASH:
        return {
          label: "Efectivo",
          icon: <DollarSign className="h-4 w-4" />,
          description: "Pago en efectivo"
        };
      case PaymentMethod.CARD:
        return {
          label: "Tarjeta",
          icon: <CreditCard className="h-4 w-4" />,
          description: "Pago con tarjeta (crédito o débito)"
        };
      case PaymentMethod.SINPE_MOVIL:
        return {
          label: "SINPE Móvil",
          icon: <Smartphone className="h-4 w-4" />,
          description: "Transferencia SINPE Móvil"
        };
      default:
        return {
          label: "Sin especificar",
          icon: <DollarSign className="h-4 w-4" />,
          description: "Método de pago no especificado"
        };
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Completar Orden
          </DialogTitle>
          <DialogDescription>
            Especifica el método de pago utilizado por el cliente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Info */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Orden:</span>
              <span className="text-sm">#{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Cliente:</span>
              <span className="text-sm">{customerName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-sm font-bold">₡{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Método de Pago</Label>
            <Select
              value={selectedMethod || "unspecified"}
              onValueChange={(value) => 
                setSelectedMethod(value === "unspecified" ? null : (value as PaymentMethod))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el método de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unspecified">Sin especificar</SelectItem>
                <SelectItem value={PaymentMethod.CASH}>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Efectivo
                  </div>
                </SelectItem>
                <SelectItem value={PaymentMethod.CARD}>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Tarjeta
                  </div>
                </SelectItem>
                <SelectItem value={PaymentMethod.SINPE_MOVIL}>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    SINPE Móvil
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            {/* Selected method info */}
            {selectedMethod && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                {getPaymentMethodInfo(selectedMethod).icon}
                {getPaymentMethodInfo(selectedMethod).description}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>
            Completar Orden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 