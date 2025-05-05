const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['ADMIN', 'KITCHEN', 'DELIVERY'],
    default: 'DELIVERY'
  }
}, {
  timestamps: true
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next();
    console.log('Hasheando contraseña...');
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Contraseña hasheada exitosamente');
    next();
  } catch (error) {
    console.error('Error al hashear contraseña:', error);
    next(error);
  }
});

// Método para comparar passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('Comparando contraseñas en el modelo...');
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Resultado de comparación:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error al comparar contraseñas:', error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema); 