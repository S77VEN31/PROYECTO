const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth.middleware');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');
const { body } = require('express-validator');

// Validaciones
const productValidation = [
  body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
  body('descripcion').trim().notEmpty().withMessage('La descripción es requerida'),
  body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('tipo').isIn(['batido', 'crepa', 'topping']).withMessage('Tipo de producto inválido')
];

// Rutas públicas
router.get('/', getProducts);
router.get('/:id', getProduct);

// Rutas protegidas (solo encargados)
router.post('/', auth, checkRole(['encargado']), productValidation, createProduct);
router.put('/:id', auth, checkRole(['encargado']), productValidation, updateProduct);
router.delete('/:id', auth, checkRole(['encargado']), deleteProduct);

module.exports = router; 