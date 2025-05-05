const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { body } = require('express-validator');
const User = require('../models/user.model');

// Validaciones
const registerValidation = [
  body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('rol').optional().isIn(['ADMIN', 'KITCHEN', 'DELIVERY']).withMessage('Rol inválido')
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

// Rutas
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Ruta temporal para debugging
router.get('/debug/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({
      id: user._id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
      passwordHash: user.password // Solo para debugging
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 