# Backend Colori Platform

Backend para el sistema de pedidos de batidos y crepas.

## Requisitos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Crear archivo .env basado en .env.example:
```bash
cp .env.example .env
```

4. Configurar las variables de entorno en el archivo .env:
- PORT: Puerto del servidor (default: 5000)
- MONGODB_URI: URL de conexión a MongoDB
- JWT_SECRET: Secreto para firmar los tokens JWT

## Ejecución

Desarrollo:
```bash
npm run dev
# o
yarn dev
```

Producción:
```bash
npm start
# o
yarn start
```

## API Endpoints

### Autenticación
- POST /api/auth/register - Registro de usuario
- POST /api/auth/login - Inicio de sesión

### Productos
- GET /api/products - Listar productos
- GET /api/products/:id - Obtener producto
- POST /api/products - Crear producto (encargado)
- PUT /api/products/:id - Actualizar producto (encargado)
- DELETE /api/products/:id - Eliminar producto (encargado)

### Pedidos
- POST /api/orders - Crear pedido (cliente)
- GET /api/orders - Listar pedidos
- GET /api/orders/:id - Obtener pedido
- PATCH /api/orders/:id/status - Actualizar estado (encargado)

## Roles de Usuario

- Cliente: Puede ver productos y crear pedidos
- Encargado: Puede gestionar productos y actualizar estados de pedidos 