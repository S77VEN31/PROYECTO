const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Rutas públicas
router.post('/', orderController.createOrder);

// Rutas protegidas (solo admin)
router.get('/', verifyToken, isAdmin, orderController.getOrders);

// Rutas públicas
router.get('/:id', orderController.getOrder);

// Rutas protegidas (solo admin)
router.put('/:id/status', verifyToken, isAdmin, orderController.updateOrderStatus);
router.delete('/:id', verifyToken, isAdmin, orderController.deleteOrder);

module.exports = router; 