'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  disponible: boolean;
  esTopping: boolean;
  precioTopping?: number;
}

export default function EditProductForm({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product>({
    _id: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: 'batido',
    imagen: '',
    disponible: true,
    esTopping: false,
    precioTopping: 0
  });

  useEffect(() => {
    const id = params?.id;
    if (id && id !== 'new') {
      fetchProduct(id);
    } else {
      setLoading(false);
    }
  }, [params]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`);
      if (!response.ok) throw new Error('Error al cargar el producto');
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      toast.error('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const id = params?.id;
      const url = id === 'new'
        ? 'http://localhost:3001/api/products'
        : `http://localhost:3001/api/products/${id}`;
      
      const method = id === 'new' ? 'POST' : 'PUT';

      // Crear un objeto sin _id para nuevos productos
      const productData = id === 'new' 
        ? {
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            categoria: product.categoria,
            imagen: product.imagen,
            disponible: product.disponible,
            esTopping: product.esTopping,
            precioTopping: product.precioTopping
          }
        : product;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error('Error al guardar el producto');

      toast.success(id === 'new' ? 'Producto creado exitosamente' : 'Producto actualizado exitosamente');
      router.push('/admin/menu');
    } catch (error) {
      toast.error('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isNewProduct = params?.id === 'new';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isNewProduct ? 'Agregar Nuevo Producto' : 'Editar Producto'}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={product.nombre}
                onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={product.descripcion}
                onChange={(e) => setProduct({ ...product, descripcion: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio">Precio</Label>
              <Input
                id="precio"
                type="number"
                value={product.precio}
                onChange={(e) => setProduct({ ...product, precio: Number(e.target.value) })}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select
                value={product.categoria}
                onValueChange={(value) => setProduct({ ...product, categoria: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="batido">Batido</SelectItem>
                  <SelectItem value="crepa">Crepa</SelectItem>
                  <SelectItem value="topping">Topping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imagen">URL de la Imagen (Opcional)</Label>
              <Input
                id="imagen"
                type="text"
                value={product.imagen}
                onChange={(e) => setProduct({ ...product, imagen: e.target.value })}
                placeholder="Ingrese la URL de la imagen o déjelo vacío"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="disponible"
                checked={product.disponible}
                onCheckedChange={(checked: boolean) => setProduct({ ...product, disponible: checked })}
              />
              <Label htmlFor="disponible">Disponible</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="esTopping"
                checked={product.esTopping}
                onCheckedChange={(checked: boolean) => setProduct({ ...product, esTopping: checked })}
              />
              <Label htmlFor="esTopping">Es Topping</Label>
            </div>

            {product.esTopping && (
              <div className="space-y-2">
                <Label htmlFor="precioTopping">Precio del Topping</Label>
                <Input
                  id="precioTopping"
                  type="number"
                  value={product.precioTopping || 0}
                  onChange={(e) => setProduct({ ...product, precioTopping: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/menu')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {isNewProduct ? 'Crear Producto' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 