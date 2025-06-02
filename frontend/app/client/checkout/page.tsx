"use client";

import { OrderApiService } from "@/api/entities/order.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Esquema de validación para el formulario de checkout
const checkoutSchema = z.object({
  customerName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, summary, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  // Inicializar formulario con validación
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
    },
  });

  // Si el carrito está vacío, redirigir al menú
  if (cart.items.length === 0 && !orderId) {
    router.push("/client");
    return null;
  }

  // Manejar el envío del formulario
  const onSubmit = async (data: CheckoutFormData) => {
    if (cart.items.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    console.log("Procediendo al checkout con el carrito:", cart);
    setIsSubmitting(true);

    try {
      // Crear la orden usando el servicio API
      const response = await OrderApiService.createOrderFromCart(
        data.customerName,
        1, // Valor fijo para tableNumber
        cart.items,
        summary.subtotal,
        summary.tax || 0,
        summary.total
      );

      if (response && response.id) {
        // Guardar el ID de la orden y el número de orden (reference)
        setOrderId(response.id);
        
        // Verificar si la propiedad order y reference existen antes de usarlas
        let orderRef = "0";
        if (response.order && response.order.reference) {
          orderRef = response.order.reference;
        } else {
          // Usar los primeros 6 caracteres del ID como fallback
          orderRef = response.id.substring(0, 6);
        }
        
        setOrderNumber(orderRef);
        clearCart();
        toast.success("¡Pedido realizado con éxito!");
      } else {
        toast.error("Error al crear el pedido. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      toast.error("Error al procesar el pedido. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si la orden ya fue creada, mostrar confirmación
  if (orderId) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              ¡Pedido Confirmado!
            </CardTitle>
            <p className="text-muted-foreground">
              Tu pedido ha sido enviado a cocina
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-primary/10 border border-primary/10 rounded-lg p-4 text-center">
              <h2 className="text-lg font-medium mb-1">Número de Orden</h2>
              <p className="text-3xl font-bold text-primary">{orderNumber}</p>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-4 border-border">
                <h3 className="font-medium mb-1">
                  Tiempo Estimado de Preparación
                </h3>
                <p className="text-foreground">15-20 minutos</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Instrucciones</h3>
                <p className="text-muted-foreground">
                  Tu orden será preparada y te notificaremos cuando esté lista.
                  Por favor, recoge tu pedido en el mostrador mostrando el número
                  de orden.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button variant="default" className="w-full sm:w-auto" asChild>
              <Link href="/client">Volver al Menú</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Mostrar formulario de checkout
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Finalizar Pedido
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Información del Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu nombre"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-muted p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₡{summary.subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuesto (16%):</span>
                    <span>₡{(summary.tax || 0).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>₡{summary.total.toFixed(0)}</span>
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={() => router.push("/client/cart")}
                    type="button"
                    disabled={isSubmitting}
                  >
                    Volver al Carrito
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Confirmar Pedido"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
