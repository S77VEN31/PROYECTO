const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const initialUsers = [
  {
    nombre: 'Administrador',
    email: 'admin@colori.com',
    password: 'admin123',
    rol: 'ADMIN'
  },
  {
    nombre: 'Cocina',
    email: 'cocina@colori.com',
    password: 'cocina123',
    rol: 'KITCHEN'
  },
  {
    nombre: 'Delivery',
    email: 'delivery@colori.com',
    password: 'delivery123',
    rol: 'DELIVERY'
  }
];

const createInitialUsers = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    for (const userData of initialUsers) {
      // Verificar si el usuario ya existe
      const userExists = await User.findOne({ email: userData.email });
      
      if (!userExists) {
        // Crear usuario
        const user = new User(userData);
        await user.save();
        console.log(`Usuario ${userData.rol} creado exitosamente`);
      } else {
        console.log(`El usuario ${userData.rol} ya existe`);
      }
    }

  } catch (error) {
    console.error('Error al crear usuarios iniciales:', error);
  } finally {
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
  }
};

// Ejecutar la función
createInitialUsers(); 