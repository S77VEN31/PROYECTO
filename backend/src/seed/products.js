const mongoose = require('mongoose');
const Product = require('../models/product.model');
require('dotenv').config();

const initialProducts = [
  // Batidos
  {
    nombre: "Batido de Fresa",
    descripcion: "Batido cremoso de fresa con leche y helado",
    precio: 5.99,
    categoria: "batido",
    imagen: "/images/batido-fresa.jpg",
    esTopping: false,
    toppingsDisponibles: []
  },
  {
    nombre: "Batido de Chocolate",
    descripcion: "Batido cremoso de chocolate con leche y helado",
    precio: 5.99,
    categoria: "batido",
    imagen: "/images/batido-chocolate.jpg",
    esTopping: false,
    toppingsDisponibles: []
  },
  {
    nombre: "Batido de Vainilla",
    descripcion: "Batido cremoso de vainilla con leche y helado",
    precio: 5.99,
    categoria: "batido",
    imagen: "/images/batido-vainilla.jpg",
    esTopping: false,
    toppingsDisponibles: []
  },

  // Crepes
  {
    nombre: "Crepe de Nutella",
    descripcion: "Crepe relleno de Nutella con fresas",
    precio: 6.99,
    categoria: "crepa",
    imagen: "/images/crepe-nutella.jpg",
    esTopping: false,
    toppingsDisponibles: []
  },
  {
    nombre: "Crepe de Caramelo",
    descripcion: "Crepe relleno de caramelo con plátano",
    precio: 6.99,
    categoria: "crepa",
    imagen: "/images/crepe-caramelo.jpg",
    esTopping: false,
    toppingsDisponibles: []
  },
  {
    nombre: "Crepe de Frutas",
    descripcion: "Crepe relleno de frutas frescas",
    precio: 7.99,
    categoria: "crepa",
    imagen: "/images/crepe-frutas.jpg",
    esTopping: false,
    toppingsDisponibles: []
  },

  // Toppings
  {
    nombre: "Chocolate",
    descripcion: "Salsa de chocolate",
    precio: 0.50,
    categoria: "topping",
    imagen: "/images/topping-chocolate.jpg",
    esTopping: true,
    precioTopping: 0.50
  },
  {
    nombre: "Caramelo",
    descripcion: "Salsa de caramelo",
    precio: 0.50,
    categoria: "topping",
    imagen: "/images/topping-caramelo.jpg",
    esTopping: true,
    precioTopping: 0.50
  },
  {
    nombre: "Fresa",
    descripcion: "Salsa de fresa",
    precio: 0.50,
    categoria: "topping",
    imagen: "/images/topping-fresa.jpg",
    esTopping: true,
    precioTopping: 0.50
  },
  {
    nombre: "Nueces",
    descripcion: "Nueces picadas",
    precio: 0.75,
    categoria: "topping",
    imagen: "/images/topping-nueces.jpg",
    esTopping: true,
    precioTopping: 0.75
  },
  {
    nombre: "Chantilly",
    descripcion: "Crema batida",
    precio: 0.50,
    categoria: "topping",
    imagen: "/images/topping-chantilly.jpg",
    esTopping: true,
    precioTopping: 0.50
  }
];

const createInitialProducts = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Limpiar productos existentes
    await Product.deleteMany({});
    console.log('Productos existentes eliminados');

    // Crear nuevos productos
    const products = await Product.insertMany(initialProducts);
    console.log('Productos creados exitosamente');

    // Actualizar toppings disponibles para crepes
    const toppings = products.filter(p => p.esTopping);
    const crepes = products.filter(p => p.categoria === 'crepa');

    for (const crepe of crepes) {
      crepe.toppingsDisponibles = toppings.map(t => t._id);
      await crepe.save();
    }

    console.log('Toppings asignados a crepes');

  } catch (error) {
    console.error('Error al crear productos iniciales:', error);
  } finally {
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
  }
};

// Ejecutar la función
createInitialProducts(); 