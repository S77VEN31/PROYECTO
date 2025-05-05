'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'batido' | 'crepa' | 'topping';
  imagen: string;
  disponible: boolean;
  esTopping: boolean;
  precioTopping: number;
  toppingsDisponibles: string[];
}

const MenuAdmin = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products/menu', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Error al cargar los productos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error('Error al cargar los productos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Error al eliminar el producto');

      toast.success('Producto eliminado exitosamente');
      fetchProducts();
    } catch (error) {
      toast.error('Error al eliminar el producto');
      console.error(error);
    }
  };

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ disponible: !currentStatus })
      });

      if (!response.ok) throw new Error('Error al actualizar el estado del producto');

      toast.success('Estado del producto actualizado');
      fetchProducts();
    } catch (error) {
      toast.error('Error al actualizar el estado del producto');
      console.error(error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/menu/edit/${id}`);
  };

  const handleAdd = () => {
    router.push('/admin/menu/edit/new');
  };

  const filteredProducts = selectedCategory === 'todos'
    ? products
    : products.filter(product => product.categoria === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión del Menú</h1>
        <Button onClick={handleAdd}>
          Agregar Producto
        </Button>
      </div>

      <div className="mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas las categorías</SelectItem>
            <SelectItem value="batido">Batidos</SelectItem>
            <SelectItem value="crepa">Crepes</SelectItem>
            <SelectItem value="topping">Toppings</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product._id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={product.imagen || '/placeholder-food.jpg'}
                alt={product.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Button
                  variant={product.disponible ? "default" : "destructive"}
                  size="sm"
                  onClick={() => handleToggleAvailability(product._id, product.disponible)}
                >
                  {product.disponible ? 'Disponible' : 'No disponible'}
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{product.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{product.descripcion}</p>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-lg">
                  ${product.precio}
                </Badge>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product._id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuAdmin; 