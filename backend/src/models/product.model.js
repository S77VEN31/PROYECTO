const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  categoria: {
    type: String,
    enum: ['batido', 'crepa', 'topping', 'promocion'],
    required: true
  },
  imagen: {
    type: String,
    default: null
  },
  disponible: {
    type: Boolean,
    default: true
  },
  esTopping: {
    type: Boolean,
    default: false
  },
  precioTopping: {
    type: Number,
    min: 0,
    default: 0
  },
  toppingsDisponibles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  fechaInicio: {
    type: Date,
    default: null
  },
  fechaFin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 