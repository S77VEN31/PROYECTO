const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Función para crear usuario administrador
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@colori.com' });
    if (adminExists) {
      console.log('Usuario administrador ya existe');
      return;
    }

    const adminUser = new User({
      nombre: 'Administrador',
      email: 'admin@colori.com',
      password: 'admin123',
      rol: 'ADMIN'
    });

    await adminUser.save();
    console.log('Usuario administrador creado exitosamente');
  } catch (error) {
    console.error('Error al crear usuario administrador:', error);
  }
};

// Crear usuario administrador al iniciar
createAdminUser();

const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado.' });
    }

    const user = new User({
      nombre,
      email,
      password,
      rol: rol || 'DELIVERY'
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      data: {
        user: {
          id: user._id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        },
        token
      },
      message: 'Usuario registrado exitosamente',
      status: 201
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(400).json({ 
      error: error.message,
      status: 400
    });
  }
};

const login = async (req, res) => {
  try {
    console.log('Intento de login con:', { email: req.body.email });
    
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('Faltan credenciales:', { email: !!email, password: !!password });
      return res.status(400).json({ 
        error: 'Email y contraseña son requeridos',
        status: 400
      });
    }

    const user = await User.findOne({ email });
    console.log('Usuario encontrado:', user ? 'Sí' : 'No');
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas.',
        status: 401
      });
    }

    console.log('Comparando contraseñas...');
    const isMatch = await user.comparePassword(password);
    console.log('¿Contraseña coincide?:', isMatch ? 'Sí' : 'No');
    
    if (!isMatch) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas.',
        status: 401
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET no está definido en las variables de entorno');
      return res.status(500).json({
        error: 'Error de configuración del servidor',
        status: 500
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login exitoso para:', email);
    res.json({
      data: {
        user: {
          id: user._id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        },
        token
      },
      message: 'Inicio de sesión exitoso',
      status: 200
    });
  } catch (error) {
    console.error('Error detallado en login:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(400).json({ 
      error: error.message,
      status: 400
    });
  }
};

module.exports = {
  register,
  login
}; 