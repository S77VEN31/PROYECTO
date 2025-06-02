"use client";

import { OrderApiService } from "@/api/entities/order.api";
import { Breadcrumb } from "@/components/ui/breadcrumb";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryVariant } from "colori-platform-shared";
import { Check, CreditCard, Loader2 } from "lucide-react";
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

// Componente de header consistente con otras páginas
function CheckoutHeader() {
  return (
    <div className="text-center space-y-4">
      {/* Ícono de checkout con estilo consistente */}
      <div className="flex justify-center">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full border-2",
            "bg-primary/10 border-primary/20",
            "transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
            "hover:bg-primary/15 hover:border-primary/30"
          )}
        >
          <CreditCard className="h-10 w-10 text-primary" />
        </div>
      </div>

      {/* Título y descripción */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Finalizar Pedido
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Completa tu información para confirmar el pedido
        </p>
      </div>
    </div>
  );
}

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
      toast.error(
        "Error al procesar el pedido. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si la orden ya fue creada, mostrar confirmación
  if (orderId) {
    const breadcrumbItems = [
      {
        label: "Inicio",
        href: "/client",
      },
      {
        label: "Carrito",
        href: "/client/cart",
      },
      {
        label: "Confirmación",
        isActive: true,
      },
    ];

    return (
      <div className="container mx-auto py-6 md:py-10 px-4 max-w-7xl space-y-6">
        {/* Breadcrumb consistente */}
        <Breadcrumb
          items={breadcrumbItems}
          categoryVariant={CategoryVariant.DEFAULT}
        />

        {/* Header de confirmación */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full border-2",
                "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
              )}
            >
              <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tu pedido ha sido enviado a cocina
            </p>
          </div>
        </div>

        {/* Contenido de confirmación */}
        <div className="max-w-md mx-auto">
          <Card className="border-2 shadow-lg">
            <CardContent className="pt-6 space-y-6">
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
                    Tu orden será preparada y te notificaremos cuando esté
                    lista. Por favor, recoge tu pedido en el mostrador mostrando
                    el número de orden.
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button variant="default" className="w-full" asChild>
                <Link href="/client">Volver al Menú</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // Preparar items del breadcrumb
  const breadcrumbItems = [
    {
      label: "Inicio",
      href: "/client",
    },
    {
      label: "Carrito",
      href: "/client/cart",
    },
    {
      label: "Checkout",
      isActive: true,
    },
  ];

  // Mostrar formulario de checkout
  return (
    <div className="container mx-auto py-6 md:py-10 px-4 max-w-7xl space-y-6">
      {/* Breadcrumb consistente */}
      <Breadcrumb
        items={breadcrumbItems}
        categoryVariant={CategoryVariant.DEFAULT}
      />

      {/* Header de checkout con estilo consistente */}
      <CheckoutHeader />

      {/* Formulario de checkout */}
      <div className="max-w-md mx-auto">
        <Card className="border-2 shadow-lg transition-all duration-300 hover:shadow-xl bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground">
              Información del Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                      <FormLabel className="font-medium text-foreground">
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu nombre"
                          {...field}
                          disabled={isSubmitting}
                          className="border-2 focus:border-primary/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    Resumen del Pedido
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Subtotal:
                      </span>
                      <span className="font-semibold text-foreground">
                        ₡{summary.subtotal.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Impuesto (16%):
                      </span>
                      <span className="font-semibold text-foreground">
                        ₡{(summary.tax || 0).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="font-bold text-lg text-foreground">
                      Total:
                    </span>
                    <span className="font-bold text-xl text-primary">
                      ₡{summary.total.toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between space-x-4 pt-4">
                  <Button
                    variant="outline"
                    className="w-1/2 h-12 font-medium border-2"
                    onClick={() => router.push("/client/cart")}
                    type="button"
                    disabled={isSubmitting}
                  >
                    Volver al Carrito
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2 h-12 font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
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
