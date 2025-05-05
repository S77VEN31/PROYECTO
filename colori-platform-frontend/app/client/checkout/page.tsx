"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus, ArrowLeft, Trash2 } from "lucide-react";
import { orderService } from "@/lib/services/orderService";
import { toast } from "sonner";
import { productService, type Product } from "@/lib/services/product.service";

interface CartItem {
  producto: Product;
  cantidad: number;
  notas?: string;
  toppingsSeleccionados: string[];
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toppings, setToppings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar el carrito del localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      router.push('/client');
    }
    loadToppings();
  }, [router]);

  const loadToppings = async () => {
    try {
      const toppingsData = await productService.getAllToppings();
      setToppings(toppingsData);
    } catch (error) {
      toast.error("Error al cargar los toppings");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[index].cantidad = newQuantity;
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeItem = (index: number) => {
    setCart(prevCart => {
      const newCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem('cart', JSON.stringify(newCart));
      if (newCart.length === 0) {
        router.push('/client');
      }
      return newCart;
    });
  };

  const updateNotes = (index: number, notes: string) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[index].notas = notes;
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const calculateItemTotal = (item: CartItem) => {
    const toppingsTotal = item.toppingsSeleccionados.reduce((sum, toppingId) => {
      const topping = toppings.find(t => t._id === toppingId);
      return sum + (topping?.precioTopping || 0);
    }, 0);
    return (item.producto.precio + toppingsTotal) * item.cantidad;
  };

  const total = cart.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        productos: cart.map(item => ({
          producto: item.producto._id,
          cantidad: item.cantidad,
          notas: item.notas,
          toppings: item.toppingsSeleccionados
        }))
      };

      const order = await orderService.createOrder(orderData);
      console.log('Orden creada:', order); // Para debugging
      localStorage.removeItem('cart');
      localStorage.setItem('lastOrderId', order._id);
      toast.success("Pedido realizado con éxito");
      router.push('/client/order-confirmation');
    } catch (error) {
      console.error('Error al crear la orden:', error); // Para debugging
      toast.error("Error al realizar el pedido");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/client')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al menú
          </Button>
          <h1 className="text-3xl font-bold">Confirmar Pedido</h1>
        </div>

        <div className="space-y-6">
          {cart.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{item.producto.nombre}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {item.toppingsSeleccionados.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Toppings:</span>{" "}
                      {item.toppingsSeleccionados.map(toppingId => {
                        const topping = toppings.find(t => t._id === toppingId);
                        return topping?.nombre;
                      }).join(', ')}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(index, item.cantidad - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.cantidad}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(index, item.cantidad + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`notes-${index}`}>Notas</Label>
                      <Input
                        id={`notes-${index}`}
                        value={item.notas || ""}
                        onChange={(e) => updateNotes(index, e.target.value)}
                        placeholder="Instrucciones especiales..."
                      />
                    </div>
                  </div>

                  <div className="text-right font-medium">
                    Subtotal: ${calculateItemTotal(item).toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer fijo */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold">
              Total: ${total.toFixed(2)}
            </span>
            <span className="text-muted-foreground">
              {cart.reduce((sum, item) => sum + item.cantidad, 0)} items
            </span>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem('cart');
                router.push('/client');
              }}
            >
              Cancelar Orden
            </Button>
            <Button
              onClick={handleSubmitOrder}
            >
              Confirmar Pedido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
