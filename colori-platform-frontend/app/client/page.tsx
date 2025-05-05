"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Plus, Minus, X, Coffee, IceCream, Gift, ArrowLeft } from "lucide-react";
import { orderService } from "@/lib/services/orderService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { productService } from "@/lib/services/product.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'batido' | 'crepa' | 'topping';
  imagen: string;
  disponible: boolean;
  esTopping: boolean;
  precioTopping?: number;
  toppingsDisponibles?: string[];
}

interface CartItem {
  producto: Product;
  cantidad: number;
  notas?: string;
  toppingsSeleccionados: string[];
}

export default function ClientPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [toppings, setToppings] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToppingsDialog, setShowToppingsDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [productosData, toppingsData] = await Promise.all([
        productService.getAllProducts(),
        productService.getAllToppings()
      ]);
      setProducts(productosData.filter(product => !product.esTopping && product.disponible));
      setToppings(toppingsData.filter(topping => topping.disponible));
    } catch (error) {
      toast.error("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.categoria === 'crepa') {
      setSelectedProduct(product);
      setSelectedToppings([]);
      setShowToppingsDialog(true);
    } else {
      addToCart(product);
    }
  };

  const handleToppingsConfirm = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, selectedToppings);
      setShowToppingsDialog(false);
      setSelectedToppings([]);
    }
  };

  const addToCart = (product: Product, selectedToppings: string[] = []) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.producto._id === product._id && 
        JSON.stringify(item.toppingsSeleccionados) === JSON.stringify(selectedToppings)
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.producto._id === product._id && 
          JSON.stringify(item.toppingsSeleccionados) === JSON.stringify(selectedToppings)
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCart, { 
        producto: product, 
        cantidad: 1, 
        toppingsSeleccionados: selectedToppings 
      }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      if (newCart[index].cantidad > 1) {
        newCart[index].cantidad -= 1;
      } else {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const updateNotes = (index: number, notes: string) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[index].notas = notes;
      return newCart;
    });
  };

  const handleSubmitOrder = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/client/checkout');
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'batido':
        return <IceCream className="h-8 w-8" />;
      case 'crepa':
        return <Coffee className="h-8 w-8" />;
      default:
        return <Gift className="h-8 w-8" />;
    }
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.categoria]) {
      acc[product.categoria] = [];
    }
    acc[product.categoria].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories = [
    {
      id: 'batido',
      name: 'Batidos',
      description: 'Deliciosos batidos preparados con los mejores ingredientes',
      icon: <IceCream className="h-12 w-12" />
    },
    {
      id: 'crepa',
      name: 'Crepas',
      description: 'Crepas dulces y saladas con los mejores toppings',
      icon: <Coffee className="h-12 w-12" />
    },
    {
      id: 'promocion',
      name: 'Promociones',
      description: 'Ofertas especiales y combos para disfrutar',
      icon: <Gift className="h-12 w-12" />
    }
  ];

  const renderCategoryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card 
          key={category.id}
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          onClick={() => setSelectedCategory(category.id)}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                {category.icon}
              </div>
              <CardTitle className="text-2xl">{category.name}</CardTitle>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderProductsByCategory = () => {
    const categoryProducts = products.filter(p => p.categoria === selectedCategory);
    const category = categories.find(c => c.id === selectedCategory);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedCategory(null)}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            {category?.icon}
            <h2 className="text-2xl font-semibold">{category?.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map(product => (
            <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-muted">
                {product.imagen ? (
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {category?.icon}
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{product.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{product.descripcion}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${product.precio.toFixed(2)}</span>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.disponible}
                    className="gap-2"
                  >
                    <Plus className="h-5 w-5" />
                    Agregar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Menú</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrito
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.reduce((sum, item) => sum + item.cantidad, 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Tu Pedido</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Tu carrito está vacío
                  </p>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="space-y-2 border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">{item.producto.nombre}</span>
                          {item.toppingsSeleccionados.length > 0 && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Toppings: {item.toppingsSeleccionados.map(toppingId => {
                                const topping = toppings.find(t => t._id === toppingId);
                                return topping?.nombre;
                              }).join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.cantidad}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddToCart(item.producto)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`notes-${index}`}>Notas</Label>
                        <Input
                          id={`notes-${index}`}
                          value={item.notas || ""}
                          onChange={(e) => updateNotes(index, e.target.value)}
                          placeholder="Instrucciones especiales..."
                        />
                      </div>
                      <div className="text-sm font-medium">
                        Subtotal: ${calculateItemTotal(item).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {selectedCategory ? renderProductsByCategory() : renderCategoryCards()}
      </div>

      {/* Footer fijo */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
          <div className="container mx-auto max-w-7xl flex justify-between items-center">
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
                onClick={() => setCart([])}
              >
                Cancelar Orden
              </Button>
              <Button
                onClick={handleSubmitOrder}
              >
                Realizar Pedido
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo de Toppings */}
      <Dialog open={showToppingsDialog} onOpenChange={setShowToppingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecciona los toppings para tu crepa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {toppings.map(topping => (
              <div key={topping._id} className="flex items-center space-x-2">
                <Checkbox
                  id={`topping-${topping._id}`}
                  checked={selectedToppings.includes(topping._id)}
                  onCheckedChange={(checked) => {
                    setSelectedToppings(prev => 
                      checked 
                        ? [...prev, topping._id]
                        : prev.filter(id => id !== topping._id)
                    );
                  }}
                />
                <Label htmlFor={`topping-${topping._id}`}>
                  {topping.nombre} (+${topping.precioTopping?.toFixed(2)})
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowToppingsDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleToppingsConfirm}>
              Agregar al carrito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
