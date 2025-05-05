const Order = require('../models/order.model');
const Product = require('../models/product.model');

const createOrder = async (req, res) => {
  try {
    const { productos } = req.body;
    let total = 0;

    // Calcular el total y verificar productos
    for (const item of productos) {
      const product = await Product.findById(item.producto);
      if (!product) {
        return res.status(400).json({ error: `Producto ${item.producto} no encontrado.` });
      }
      if (!product.disponible) {
        return res.status(400).json({ error: `Producto ${product.nombre} no está disponible.` });
      }
      total += product.precio * item.cantidad;
    }

    const order = new Order({
      usuario: req.user._id,
      productos,
      total
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const query = req.user.rol === 'cliente' ? { usuario: req.user._id } : {};
    const orders = await Order.find(query)
      .populate('usuario', 'nombre email')
      .populate('productos.producto', 'nombre precio');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('usuario', 'nombre email')
      .populate('productos.producto', 'nombre precio');

    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    // Verificar si el usuario tiene permiso para ver el pedido
    if (req.user.rol === 'cliente' && order.usuario._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'No tiene permiso para ver este pedido.' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { estado } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    order.estado = estado;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus
}; 