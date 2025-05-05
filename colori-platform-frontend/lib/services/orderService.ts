import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export interface OrderItem {
  producto: {
    _id: string;
    nombre: string;
    precio: number;
  };
  cantidad: number;
  notas?: string;
  toppings?: {
    _id: string;
    nombre: string;
    precio: number;
  }[];
}

export interface Order {
  _id: string;
  numeroOrden: number;
  productos: OrderItem[];
  total: number;
  estado: 'PENDIENTE' | 'PREPARANDO' | 'LISTO' | 'ENTREGADO';
  createdAt: string;
  notas?: string;
}

class OrderService {
  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async createOrder(orderData: { productos: OrderItem[]; notas?: string }): Promise<Order> {
    try {
      const response = await axios.post<Order>(`${API_URL}/orders`, orderData, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await axios.get<Order[]>(`${API_URL}/orders`, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async getOrder(id: string): Promise<Order> {
    try {
      const response = await axios.get<Order>(`${API_URL}/orders/${id}`, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  async updateOrderStatus(id: string, estado: 'PENDIENTE' | 'PREPARANDO' | 'LISTO' | 'ENTREGADO'): Promise<Order> {
    try {
      const response = await axios.patch<Order>(`${API_URL}/orders/${id}/status`, { estado }, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
}

export const orderService = new OrderService(); 