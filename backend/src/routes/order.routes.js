const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth.middleware');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus
} = require('../controllers/order.controller');
const { body } = require('express-validator');

// Validaciones
const orderValidation = [
  body('productos').isArray().withMessage('Los productos deben ser un array'),
  body('productos.*.producto').isMongoId().withMessage('ID de producto inválido'),
  body('productos.*.cantidad').isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1')
];

const statusValidation = [
  body('estado').isIn(['pendiente', 'en preparación', 'entregado'])
    .withMessage('Estado de pedido inválido')
];

// Rutas protegidas
router.post('/', auth, checkRole(['cliente']), orderValidation, createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrder);
router.patch('/:id/status', auth, checkRole(['encargado']), statusValidation, updateOrderStatus);

module.exports = router; 