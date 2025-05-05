const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.rol === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Se requiere rol de administrador' });
  }
};

exports.isKitchen = (req, res, next) => {
  if (req.user && (req.user.rol === 'ADMIN' || req.user.rol === 'KITCHEN')) {
    next();
  } else {
    res.status(403).json({ message: 'Se requiere rol de cocina' });
  }
};

exports.isDelivery = (req, res, next) => {
  if (req.user && (req.user.rol === 'ADMIN' || req.user.rol === 'DELIVERY')) {
    next();
  } else {
    res.status(403).json({ message: 'Se requiere rol de delivery' });
  }
}; 