'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Promotion {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  fechaInicio: string;
  fechaFin: string;
  categoria: string;
}

const PromotionsAdmin = () => {
  const router = useRouter();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products/promotions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Error al cargar las promociones');
      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      toast.error('Error al cargar las promociones');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta promoción?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Error al eliminar la promoción');

      toast.success('Promoción eliminada exitosamente');
      fetchPromotions();
    } catch (error) {
      toast.error('Error al eliminar la promoción');
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

      if (!response.ok) throw new Error('Error al actualizar el estado de la promoción');

      toast.success('Estado de la promoción actualizado');
      fetchPromotions();
    } catch (error) {
      toast.error('Error al actualizar el estado de la promoción');
      console.error(error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/promotions/edit/${id}`);
  };

  const handleAdd = () => {
    router.push('/admin/promotions/edit/new');
  };

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
        <h1 className="text-2xl font-bold">Gestión de Promociones</h1>
        <Button onClick={handleAdd}>
          Agregar Promoción
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promotion) => (
          <Card key={promotion._id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={promotion.imagen || '/placeholder-food.jpg'}
                alt={promotion.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Button
                  variant={promotion.disponible ? "default" : "destructive"}
                  size="sm"
                  onClick={() => handleToggleAvailability(promotion._id, promotion.disponible)}
                >
                  {promotion.disponible ? 'Disponible' : 'No disponible'}
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{promotion.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{promotion.descripcion}</p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>Válido desde: {new Date(promotion.fechaInicio).toLocaleDateString()}</p>
                <p>Hasta: {new Date(promotion.fechaFin).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-lg">
                  ${promotion.precio}
                </Badge>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(promotion._id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(promotion._id)}
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

export default PromotionsAdmin; 