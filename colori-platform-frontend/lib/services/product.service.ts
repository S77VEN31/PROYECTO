import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products';

export interface Product {
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

export const productService = {
  // Obtener todos los productos
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(API_URL);
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { data: any }; message: string };
      throw axiosError.response?.data || axiosError.message;
    }
  },

  // Obtener productos por categoría
  getProductsByCategory: async (categoria: string): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/categoria/${categoria}`);
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { data: any }; message: string };
      throw axiosError.response?.data || axiosError.message;
    }
  },

  // Obtener un producto por ID
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await axios.get<Product>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { data: any }; message: string };
      throw axiosError.response?.data || axiosError.message;
    }
  },

  // Obtener todos los toppings
  getAllToppings: async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/toppings/all`);
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { data: any }; message: string };
      throw axiosError.response?.data || axiosError.message;
    }
  },

  // Crear un nuevo producto (solo admin)
  createProduct: async (productData: Partial<Product>, token: string): Promise<Product> => {
    try {
      const response = await axios.post<Product>(API_URL, productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { data: any }; message: string };
      throw axiosError.response?.data || axiosError.message;
    }
  },

  // Actualizar un producto (solo admin)
  updateProduct: async (id: string, productData: Partial<Product>, token: string): Promise<Product> => {
    try {
      const response = await axios.put<Product>(`${API_URL}/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { data: any }; message: string };
      throw axiosError.response?.data || axiosError.message;
    }
  },

  // Eliminar un producto (solo admin)
  deleteProduct: async (id: string, token: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      const axiosError = error as { response?: { data: any }; message: string };
      throw axiosError.response?.data || axiosError.message;
    }
  }
}; 