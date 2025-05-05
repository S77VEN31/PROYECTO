const Order = require('../models/order.model');
const Product = require('../models/product.model');

const generateOrderNumber = async () => {
  try {
    // Obtener el inicio del día actual en la zona horaria local
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    console.log('Buscando órdenes entre:', startOfDay, 'y', endOfDay); // Debug

    // Contar cuántas órdenes hay hoy
    const count = await Order.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    console.log('Número de órdenes hoy:', count); // Debug

    // El número de orden será el conteo + 1
    const nextNumber = count + 1;
    console.log('Siguiente número de orden:', nextNumber); // Debug
    return nextNumber;
  } catch (error) {
    console.error('Error al generar número de orden:', error);
    return 1;
  }
};

const createOrder = async (req, res) => {
  try {
    // Manejar tanto el formato de array directo como el formato con propiedad productos
    let productos = Array.isArray(req.body) ? req.body : req.body.productos;
    const notas = Array.isArray(req.body) ? '' : req.body.notas;
    
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: 'La orden debe contener al menos un producto' });
    }

    // Calcular el total
    let total = 0;
    for (const item of productos) {
      if (!item.producto || !item.cantidad) {
        return res.status(400).json({ error: 'Datos de producto inválidos' });
      }
      
      // Obtener el producto de la base de datos para asegurar el precio
      const producto = await Product.findById(item.producto);
      if (!producto) {
        return res.status(400).json({ error: 'Producto no encontrado' });
      }

      const itemTotal = Number(producto.precio) * Number(item.cantidad);
      let toppingsTotal = 0;

      if (item.toppings && Array.isArray(item.toppings)) {
        // Obtener los toppings de la base de datos
        const toppings = await Product.find({ _id: { $in: item.toppings } });
        toppingsTotal = toppings.reduce((sum, topping) => {
          return sum + (Number(topping.precioTopping || 0) * Number(item.cantidad));
        }, 0);
      }

      total += itemTotal + toppingsTotal;
    }

    // Generar número de orden
    const numeroOrden = await generateOrderNumber();
    console.log('Número de orden generado:', numeroOrden); // Debug

    const order = new Order({
      numeroOrden,
      productos,
      notas: notas || '',
      total,
      estado: 'PENDIENTE'
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
};

const getOrders = async (req, res) => {
  try {
    // Definir el orden de prioridad de los estados
    const statusPriority = {
      'PREPARANDO': 1,
      'PENDIENTE': 2,
      'LISTO': 3,
      'ENTREGADO': 4
    };

    // Obtener todas las órdenes y ordenarlas
    const orders = await Order.find()
      .populate('productos.producto', 'nombre precio')
      .populate('productos.toppings', 'nombre precioTopping')
      .sort({ createdAt: -1 });

    // Ordenar las órdenes por estado y fecha
    const sortedOrders = orders.sort((a, b) => {
      // Primero por estado
      const statusDiff = statusPriority[a.estado] - statusPriority[b.estado];
      if (statusDiff !== 0) return statusDiff;

      // Si tienen el mismo estado, por fecha (más antiguo primero)
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    res.json(sortedOrders);
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('productos.producto', 'nombre precio')
      .populate('productos.toppings', 'nombre precioTopping');

    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    res.status(500).json({ error: 'Error al obtener la orden' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { estado } = req.body;
    console.log('Actualizando estado:', { id: req.params.id, estado }); // Debug

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    ).populate('productos.producto', 'nombre precio')
     .populate('productos.toppings', 'nombre precioTopping');

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    console.log('Orden actualizada:', order); // Debug
    res.json(order);
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
    res.status(500).json({ error: 'Error al actualizar el estado' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.json({ message: 'Orden eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la orden:', error);
    res.status(500).json({ error: 'Error al eliminar la orden' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder
}; 