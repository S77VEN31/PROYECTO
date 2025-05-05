const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Rutas públicas
router.get('/', productController.getAllProducts);
router.get('/menu', productController.getMenuProducts);
router.get('/promotions', productController.getPromotions);
router.get('/category/:categoria', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);
router.get('/toppings/all', productController.getAllToppings);

// Rutas protegidas (requieren autenticación y rol de admin)
router.post('/', [verifyToken, isAdmin], productController.createProduct);
router.put('/:id', [verifyToken, isAdmin], productController.updateProduct);
router.delete('/:id', [verifyToken, isAdmin], productController.deleteProduct);

module.exports = router; 