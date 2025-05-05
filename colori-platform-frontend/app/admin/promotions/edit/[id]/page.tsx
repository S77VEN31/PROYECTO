'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

export default function EditPromotionForm({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [promotion, setPromotion] = useState<Promotion>({
    _id: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    disponible: true,
    fechaInicio: '',
    fechaFin: '',
    categoria: 'promocion'
  });

  useEffect(() => {
    const id = params?.id;
    if (id && id !== 'new') {
      fetchPromotion(id);
    } else {
      setLoading(false);
    }
  }, [params]);

  const fetchPromotion = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`);
      if (!response.ok) throw new Error('Error al cargar la promoción');
      const data = await response.json();
      setPromotion(data);
    } catch (error) {
      toast.error('Error al cargar la promoción');
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

      // Crear un objeto sin _id para nuevas promociones
      const promotionData = id === 'new'
        ? {
            nombre: promotion.nombre,
            descripcion: promotion.descripcion,
            precio: promotion.precio,
            imagen: promotion.imagen,
            disponible: promotion.disponible,
            fechaInicio: promotion.fechaInicio,
            fechaFin: promotion.fechaFin,
            categoria: promotion.categoria
          }
        : promotion;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(promotionData)
      });

      if (!response.ok) throw new Error('Error al guardar la promoción');

      toast.success(id === 'new' ? 'Promoción creada exitosamente' : 'Promoción actualizada exitosamente');
      router.push('/admin/promotions');
    } catch (error) {
      toast.error('Error al guardar la promoción');
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

  const isNewPromotion = params?.id === 'new';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isNewPromotion ? 'Agregar Nueva Promoción' : 'Editar Promoción'}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Información de la Promoción</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={promotion.nombre}
                onChange={(e) => setPromotion({ ...promotion, nombre: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={promotion.descripcion}
                onChange={(e) => setPromotion({ ...promotion, descripcion: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio">Precio</Label>
              <Input
                id="precio"
                type="number"
                value={promotion.precio}
                onChange={(e) => setPromotion({ ...promotion, precio: Number(e.target.value) })}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imagen">URL de la Imagen (Opcional)</Label>
              <Input
                id="imagen"
                type="text"
                value={promotion.imagen}
                onChange={(e) => setPromotion({ ...promotion, imagen: e.target.value })}
                placeholder="Ingrese la URL de la imagen o déjelo vacío"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="disponible"
                checked={promotion.disponible}
                onCheckedChange={(checked: boolean) => setPromotion({ ...promotion, disponible: checked })}
              />
              <Label htmlFor="disponible">Disponible</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
              <Input
                id="fechaInicio"
                type="datetime-local"
                value={promotion.fechaInicio}
                onChange={(e) => setPromotion({ ...promotion, fechaInicio: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaFin">Fecha de Fin</Label>
              <Input
                id="fechaFin"
                type="datetime-local"
                value={promotion.fechaFin}
                onChange={(e) => setPromotion({ ...promotion, fechaFin: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/promotions')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {isNewPromotion ? 'Crear Promoción' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 