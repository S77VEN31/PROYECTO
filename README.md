# Colori Platform 🍽️

> **Nota**: Esta aplicación será hosteada próximamente en un servidor de producción.

## Descripción

Colori Platform es un sistema integral de gestión de restaurantes que permite la administración completa de pedidos, menús, usuarios y reportes. La plataforma está diseñada para optimizar las operaciones de restaurantes mediante una interfaz moderna y funcionalidades avanzadas.

### Características Principales

- **Gestión de Pedidos**: Sistema completo CRUD para pedidos con seguimiento en tiempo real
- **Panel de Cocina**: Visualización de pedidos en tiempo real con gestión de estados
- **Gestión de Menú**: Administración completa de productos y categorías
- **Información Nutricional**: Registro de calorías, proteínas, carbohidratos y alérgenos
- **Sistema de Usuarios**: Control de acceso por roles (admin, gerente, chef, mesero, cajero)
- **Dashboard de Rendimiento**: Métricas en tiempo real y reportes personalizados
- **Exportación a Excel**: Reportes detallados exportables con múltiples hojas
- **Sistema de Promociones**: Gestión avanzada de descuentos y ofertas especiales

## Arquitectura Técnica

### Stack Tecnológico

**Frontend:**
- Next.js 15.2.4 con React 19
- TypeScript para tipado estático
- Tailwind CSS para estilos
- Radix UI para componentes accesibles
- React Hook Form + Zod para validación de formularios
- Axios para comunicación con API

**Backend:**
- Node.js con Express.js
- TypeScript
- MongoDB con Mongoose ODM
- JWT para autenticación
- Bcrypt para encriptación de contraseñas
- Multer para manejo de archivos
- Express Validator + Zod para validación

**Arquitectura:**
- Monorepo con Yarn Workspaces
- Shared package para tipos y utilidades comunes
- Separación clara entre frontend, backend y shared

### Estructura del Proyecto

```
colori-platform/
├── frontend/          # Aplicación Next.js
├── backend/           # API REST con Express
├── shared/            # Tipos y utilidades compartidas
├── tests/             # Pruebas automatizadas
├── pruebas_selenium/  # Pruebas E2E con Selenium
└── docs/              # Documentación técnica
```

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- Yarn (gestor de paquetes)
- MongoDB (local o remoto)

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd colori-platform
   ```

2. **Instalar dependencias:**
   ```bash
   yarn install:all
   ```

3. **Configurar variables de entorno:**
   
   Crear archivo `.env` en la carpeta `backend/`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/colori-platform
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=development
   ```

4. **Construir el proyecto shared:**
   ```bash
   yarn build:shared
   ```

## Ejecución

### Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
# Ejecutar backend y frontend simultáneamente
yarn dev

# O ejecutar por separado:
yarn dev:backend    # Ejecuta el servidor backend en puerto 5000
yarn dev:frontend   # Ejecuta la aplicación frontend en puerto 3000
```

### Producción

```bash
# Construir todos los componentes
yarn build

# Iniciar en producción
yarn start
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `yarn dev` | Ejecuta backend y frontend en modo desarrollo |
| `yarn dev:backend` | Ejecuta solo el backend en modo desarrollo |
| `yarn dev:frontend` | Ejecuta solo el frontend en modo desarrollo |
| `yarn build` | Construye todos los componentes para producción |
| `yarn build:shared` | Construye el paquete compartido |
| `yarn build:backend` | Construye el backend |
| `yarn build:frontend` | Construye el frontend |
| `yarn install:all` | Instala dependencias en todos los workspaces |
| `yarn clean` | Limpia archivos de construcción |

## Funcionalidades Implementadas

### ✅ Gestión de Pedidos (REQ-F01)
- CRUD completo de pedidos
- Navegación de menú y carrito de compras
- Confirmación de pedidos

### ✅ Validación Nutricional (REQ-F02)
- Información nutricional opcional por producto
- Lista de alérgenos
- Consulta en detalle del producto

### ✅ Confirmación de Pedido (REQ-F03)
- Resumen final antes de confirmar
- Visualización de productos, cantidades, precios e impuestos

### ✅ Identificación del Pedido (REQ-F04)
- Número de orden único
- Seguimiento desde cliente hasta cocina

### ✅ Panel de Cocina (REQ-F05)
- Visualización en tiempo real
- Tiempo transcurrido desde recepción
- Instrucciones especiales

### ✅ Gestión de Usuarios (REQ-F06)
- CRUD de usuarios con roles
- Control de accesos por tipo de usuario
- Validaciones y filtros

### ✅ Estados de Pedido (REQ-F07)
- Ciclo de vida: pendiente → preparando → listo → entregado
- Control desde panel de cocina

### ✅ Historial de Pedidos (REQ-F08)
- Registro completo en dashboard administrativo
- Almacenamiento para reportes futuros

### ✅ Gestión del Menú (REQ-F09)
- CRUD de productos
- Manejo de imágenes
- Tiempo estimado de preparación

### ✅ Categorías de Productos (REQ-F10)
- Organización por categorías
- Orden específico de visualización

### ✅ Reportes Personalizados (REQ-F11)
- Reportes por día, semana o mes
- Filtros avanzados
- Exportación a Excel

### ✅ Dashboard de Rendimiento (REQ-F12)
- Métricas en tiempo real
- Productos más vendidos
- Tiempo promedio de preparación

### ✅ Sistema de Promociones (REQ-F13)
- Múltiples tipos de promociones
- Configuraciones avanzadas
- Códigos promocionales

### ✅ Control por Roles (REQ-F14)
- Interfaces diferenciadas por rol
- Redirección automática a panel correspondiente

### ✅ Exportación a Excel (REQ-F15)
- Múltiples hojas en archivo Excel
- Formato automático
- Sin límite de registros

## Roles de Usuario

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Admin** | Administrador del sistema | Acceso completo a todas las funcionalidades |
| **Gerente** | Gestión operativa | Reportes, usuarios, configuración del menú |
| **Chef** | Jefe de cocina | Panel de cocina, gestión de estados de pedidos |
| **Mesero** | Atención al cliente | Toma de pedidos, consulta de estados |
| **Cajero** | Punto de venta | Procesamiento de pagos, consulta de pedidos |

## Tecnologías y Librerías Principales

### Frontend
- **Next.js 15**: Framework React con SSR/SSG
- **React 19**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos utilitarios
- **Radix UI**: Componentes accesibles
- **React Hook Form**: Gestión de formularios
- **Zod**: Validación de esquemas
- **Axios**: Cliente HTTP
- **Lucide React**: Iconos
- **XLSX**: Exportación a Excel

### Backend
- **Express.js**: Framework web para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación basada en tokens
- **Bcrypt**: Encriptación de contraseñas
- **Multer**: Manejo de archivos
- **Morgan**: Logger HTTP
- **CORS**: Configuración de CORS

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Documentación Adicional

- **Manual Técnico**: `MANUAL_TECNICO.pdf`
- **Manual de Usuario**: `MANUAL_USUARIO.pdf`
- **Plan de Pruebas**: `PLAN_PRUEBAS.pdf`
- **Requerimientos**: `REQUERIMIENTOS.md`

## Licencia

Este proyecto es privado y propietario.

---

**Desarrollado con ❤️ para optimizar la gestión de restaurantes**
