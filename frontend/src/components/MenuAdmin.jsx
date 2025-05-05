import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const MenuAdmin = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`
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

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
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

  const handleToggleAvailability = async (id, currentStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

  const filteredProducts = selectedCategory === 'todos'
    ? products
    : products.filter(product => product.categoria === selectedCategory);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión del Menú</h1>
        <button
          onClick={() => navigate('/admin/menu/new')}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Agregar Producto
        </button>
      </div>

      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full md:w-64 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="todos">Todas las categorías</option>
          <option value="batido">Batidos</option>
          <option value="crepa">Crepes</option>
          <option value="topping">Toppings</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={product.imagen || '/placeholder-food.jpg'}
                alt={product.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleToggleAvailability(product._id, product.disponible)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    product.disponible
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {product.disponible ? 'Disponible' : 'No disponible'}
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.nombre}</h3>
              <p className="text-gray-600 mb-2">{product.descripcion}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.precio}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => navigate(`/admin/menu/edit/${product._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuAdmin; 