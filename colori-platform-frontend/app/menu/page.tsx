'use client';

import { useState, useEffect } from 'react';
import { productService, type Product } from '@/lib/services/product.service';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer'
  }
}));

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'batido' | 'crepa' | 'topping'>('batido');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      console.log('Cargando productos de categoría:', selectedCategory);
      const data = await productService.getProductsByCategory(selectedCategory);
      console.log('Productos cargados:', data);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (_event: React.SyntheticEvent, newValue: 'batido' | 'crepa' | 'topping') => {
    setSelectedCategory(newValue);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Nuestro Menú
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Batidos" value="batido" />
          <Tab label="Crepes" value="crepa" />
          <Tab label="Toppings" value="topping" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={product.imagen || '/images/placeholder.jpg'}
                alt={product.nombre}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.descripcion}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.precio.toFixed(2)}
                </Typography>
                {product.esTopping && (
                  <Typography variant="body2" color="text.secondary">
                    Precio por topping: ${product.precioTopping?.toFixed(2)}
                  </Typography>
                )}
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 