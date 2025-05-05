import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a Nuestra Cafetería
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Descubre nuestra deliciosa selección de batidos y crepes
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Link href="/menu" passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mr: 2 }}
            >
              Ver Menú
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button
              variant="outlined"
              color="primary"
              size="large"
            >
              Iniciar Sesión
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
