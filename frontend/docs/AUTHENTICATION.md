# Sistema de Autenticación Centralizado

## Descripción

Este proyecto implementa un sistema de autenticación centralizado que permite:

- Gestión de estado de autenticación global
- Logout centralizado desde cualquier parte de la aplicación
- Protección automática de rutas
- Manejo automático de errores de autenticación en APIs

## Estructura

### Archivos Principales

- `api/entities/auth.api.ts` - Servicio de API para autenticación
- `contexts/AuthContext.tsx` - Contexto React para estado global
- `hooks/useAuth.ts` - Hook personalizado para autenticación
- `components/auth/` - Componentes relacionados con autenticación
- `api/interceptors.ts` - Interceptores para manejo automático de tokens

### Componentes Disponibles

- `AuthProvider` - Proveedor de contexto de autenticación
- `AuthGuard` - Componente para proteger rutas
- `LogoutButton` - Botón de logout reutilizable

## Uso

### 1. Configuración Inicial

El `AuthProvider` ya está configurado en `app/layout.tsx`:

```tsx
<AuthProvider>
  {children}
</AuthProvider>
```

### 2. Protección de Rutas

Para proteger rutas, envuelve el contenido con `AuthGuard`:

```tsx
import { AuthGuard } from "@/components/auth";

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>Contenido protegido</div>
    </AuthGuard>
  );
}
```

### 3. Uso del Hook de Autenticación

```tsx
import { useAuthContext } from "@/contexts/AuthContext";

export default function MyComponent() {
  const { user, isAuthenticated, login, logout, forceLogout } = useAuthContext();

  return (
    <div>
      {isAuthenticated ? (
        <p>Bienvenido, {user?.name}</p>
      ) : (
        <p>No autenticado</p>
      )}
    </div>
  );
}
```

### 4. Login

```tsx
const { login } = useAuthContext();

const handleLogin = async (email: string, password: string) => {
  try {
    await login(email, password);
    // Redirección automática basada en rol
  } catch (error) {
    console.error("Error de login:", error);
  }
};
```

### 5. Logout

#### Logout Normal
```tsx
const { logout } = useAuthContext();

const handleLogout = async () => {
  await logout(); // Hace llamada a API y limpia estado
};
```

#### Logout Forzado (Centralizado)
```tsx
const { forceLogout } = useAuthContext();

// Para logout inmediato sin llamada a API
forceLogout();

// O desde cualquier lugar usando el servicio directamente
import { AuthApiService } from "@/api/entities/auth.api";
AuthApiService.forceLogout();
```

### 6. Botón de Logout

```tsx
import { LogoutButton } from "@/components/auth";

<LogoutButton 
  variant="outline" 
  size="sm"
  showIcon={true}
>
  Cerrar Sesión
</LogoutButton>
```

## Características Avanzadas

### Interceptores Automáticos

Los interceptores se configuran automáticamente y:

- Añaden el token de autenticación a todas las requests
- Manejan errores 401 (no autorizado) con logout automático
- Manejan errores 403 (prohibido) con logging
- Manejan errores de servidor (5xx)

### Eventos Personalizados

El sistema utiliza eventos personalizados para logout centralizado:

```javascript
// Se dispara automáticamente en logout
window.dispatchEvent(new CustomEvent('auth:logout'));

// Escuchar el evento
window.addEventListener('auth:logout', handleLogoutEvent);
```

### Persistencia

- Token y datos de usuario se guardan en `localStorage`
- Se restauran automáticamente al recargar la página
- Se limpian automáticamente en logout

## Flujo de Autenticación

1. Usuario hace login → Token y datos se guardan en localStorage
2. Interceptores añaden token a todas las requests automáticamente
3. Si hay error 401 → Logout automático y redirección a login
4. Usuario hace logout → Limpieza de datos y redirección

## Rutas Protegidas

Las siguientes rutas están protegidas automáticamente:

- `/admin/*` - Protegido en `app/admin/layout.tsx`
- `/kitchen/*` - Protegido en `app/kitchen/layout.tsx`

## Redirección por Roles

Después del login, los usuarios son redirigidos según su rol:

- `admin`, `manager` → `/admin`
- `chef` → `/kitchen`
- `server`, `cashier`, otros → `/client` 