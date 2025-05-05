const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
 
// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 