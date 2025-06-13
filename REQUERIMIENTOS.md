
# Requerimientos a Cumplir

- [X] REQ-F01: Gestión de Pedidos
El sistema debe permitir la creación, lectura, actualización y eliminación (CRUD) de pedidos por parte de los clientes y meseros. Esto incluye la navegación del menú, selección de productos y agregarlos al carrito para su posterior confirmación.

- [X] REQ-F02: Validación Nutricional y de Alérgenos
El sistema debe permitir registrar información nutricional opcional (calorías, proteínas, carbohidratos, grasas) y una lista de alérgenos por producto, con el fin de que los clientes puedan consultarla en el detalle del producto antes de hacer el pedido.

- [X] REQ-F03: Confirmación de Pedido
Antes de enviar el pedido, el cliente debe visualizar un resumen final del mismo, incluyendo todos los productos seleccionados, cantidades, precios, impuestos y total a pagar.

- [X] REQ-F04: Identificación del Pedido
Una vez confirmado el pedido, el sistema debe asignar un número de orden único que será mostrado al cliente, enviado a cocina y utilizado para su posterior llamada cuando esté listo.

- [X] REQ-F05: Visualización de Pedidos en Cocina
Los pedidos deben visualizarse en la interfaz del panel de cocina en tiempo real, mostrando los productos, cantidades, instrucciones especiales y tiempo desde que fue recibido.

- [X] REQ-F06: Gestión de Usuarios
El sistema debe permitir a los administradores realizar operaciones CRUD sobre los usuarios, incluyendo nombre, correo electrónico, rol (admin, gerente, chef, mesero, cajero), estado activo/inactivo y permisos. Debe incluir validaciones, filtros por rol, y control de accesos según tipo de usuario.

- [X] REQ-F07: Gestión de Estados de Pedido
Cada pedido debe pasar por un ciclo de vida controlado: pendiente → preparando → listo → entregado. El personal de cocina debe poder cambiar estos estados desde su panel.

- [X] REQ-F08: Registro e Historial de Pedidos
Al finalizar un pedido, este debe ser registrado con sus detalles en el dashboard administrativo y almacenado en el historial para futuras consultas y reportes.

- [X] REQ-F09: Gestión del Menú
El sistema debe permitir a los usuarios con permisos adecuados realizar operaciones CRUD sobre los productos del menú, incluyendo imágenes, información nutricional y tiempo estimado de preparación.

- [X] REQ-F10: Gestión de Categorías de Productos
El sistema debe permitir crear, editar y organizar categorías para clasificar los productos del menú. Cada categoría debe tener nombre, descripción, imagen representativa y un orden específico de visualización en la interfaz del cliente.

- [X] REQ-F11: Reportes de Ventas Personalizados
Se debe permitir la generación y descarga de reportes detallados de ventas por día, semana o mes, aplicando filtros como estado de orden, método de pago o cliente. Los datos deben exportarse a Excel en múltiples hojas.

- [X] REQ-F12: Dashboard de Rendimiento
El sistema debe contar con un dashboard que muestre en tiempo real las métricas clave: total de ventas, pedidos completados, tiempo promedio de preparación y productos más vendidos.

- [X] REQ-F13: Administración de Promociones
Se debe permitir crear promociones con distintos tipos (descuento, BOGO, paquete, etc.) y configuraciones avanzadas como fechas, productos aplicables, límites de uso y códigos promocionales.

- [X] REQ-F14: Control de Modo de Operación por Rol
El sistema debe diferenciar la interfaz y funcionalidades según el rol del usuario autenticado (admin, gerente, chef, mesero o cajero), redirigiéndolo automáticamente a su panel correspondiente.

- [X] REQ-F15: Exportación de Reportes a Excel
El sistema debe permitir exportar los reportes de ventas a archivos Excel, incluyendo múltiples hojas (órdenes, estadísticas, ventas diarias, filtros aplicados), con formato automático y sin límite de registros paginados.