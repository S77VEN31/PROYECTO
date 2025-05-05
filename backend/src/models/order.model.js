const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  numeroOrden: {
    type: Number,
    required: true,
    unique: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    notas: String,
    toppings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]
  }],
  estado: {
    type: String,
    enum: ['PENDIENTE', 'PREPARANDO', 'LISTO', 'ENTREGADO'],
    default: 'PENDIENTE'
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  notas: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema); 