export interface Promotion {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  discountType: "percentage" | "fixed" | "bundle";
  discountValue: number;
  startDate: string;
  endDate: string;
  imageSrc: string;
  active: boolean;
  applicableProducts: string[]; // Contiene IDs de productos
  minimumPurchase?: number;
  code?: string;
  limitPerCustomer?: number;
  featured?: boolean;
  tags?: string[];
}

// Helper para generar fechas relativas (hoy + días)
const today = new Date();
const formatDate = (date: Date) => date.toISOString().split("T")[0];
const dateAfterDays = (days: number) => {
  const date = new Date(today);
  date.setDate(today.getDate() + days);
  return formatDate(date);
};

// Las fechas se generan dinámicamente basadas en la fecha actual
const TODAY = formatDate(today);
const NEXT_MONTH = dateAfterDays(30);
const NEXT_3_MONTHS = dateAfterDays(90);
const NEXT_6_MONTHS = dateAfterDays(180);
const NEXT_YEAR = dateAfterDays(365);
const LAST_MONTH = dateAfterDays(-30);
const LAST_WEEK = dateAfterDays(-7);

// Lista de IDs de productos por categoría para facilitar la asignación
const ENTRADAS_IDS = ["101", "102", "103", "104"];
const PLATOS_PRINCIPALES_IDS = ["201", "202", "203", "204", "205"];
const POSTRES_IDS = ["301", "302", "303", "304", "305"];
const BEBIDAS_IDS = ["401", "402", "403", "404"];

export const mockPromotions: Promotion[] = [
  {
    id: "promo-001",
    name: "2x1 en Postres",
    description:
      "Lleva 2 postres y paga solo 1. Válido todos los martes y miércoles.",
    longDescription:
      "Esta promoción te permite disfrutar de dos deliciosos postres por el precio de uno. Aplicable a cualquier combinación de postres de nuestra carta. Una dulce oportunidad para compartir con alguien especial o disfrutar de doble postre. Disponible solo los martes y miércoles durante horario regular.",
    discountType: "bundle",
    discountValue: 100, // 100% descuento en el segundo
    startDate: LAST_MONTH,
    endDate: NEXT_3_MONTHS,
    imageSrc:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1974&auto=format&fit=crop",
    active: true,
    applicableProducts: ["301", "302", "303"],
    limitPerCustomer: 1,
    featured: true,
    tags: ["Postres", "2x1", "Oferta especial"],
  },
  {
    id: "promo-002",
    name: "15% en Platos Principales",
    description:
      "Disfruta un 15% de descuento en todos los platos principales de lunes a jueves.",
    longDescription:
      "Aprovecha este increíble descuento del 15% aplicable a todos nuestros platos principales. Esta promoción está disponible de lunes a jueves para que disfrutes de nuestras especialidades en días menos concurridos. El descuento se aplica automáticamente a tu pedido sin necesidad de códigos promocionales.",
    discountType: "percentage",
    discountValue: 15,
    startDate: LAST_WEEK,
    endDate: NEXT_6_MONTHS,
    imageSrc:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1974&auto=format&fit=crop",
    active: true,
    applicableProducts: PLATOS_PRINCIPALES_IDS.slice(0, 4), // Solo los primeros 4 platos principales
    tags: ["Platos principales", "Descuento", "Entre semana"],
  },
  {
    id: "promo-003",
    name: "Combo Familiar",
    description:
      "4 platos principales, 2 entradas y 4 bebidas con 25% de descuento.",
    longDescription:
      "Nuestro Combo Familiar es perfecto para compartir con tus seres queridos. Incluye 4 platos principales a elección, 2 entradas para compartir y 4 bebidas. Todo con un 25% de descuento sobre el precio regular. La mejor opción para disfrutar en familia o con amigos sin gastar de más.",
    discountType: "percentage",
    discountValue: 25,
    startDate: LAST_MONTH,
    endDate: NEXT_6_MONTHS,
    imageSrc:
      "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?q=80&w=2070&auto=format&fit=crop",
    active: true,
    applicableProducts: [], // Aplicable a todos los productos
    minimumPurchase: 50,
    code: "FAMILIA25",
    featured: true,
    tags: ["Familiar", "Combo", "Gran descuento"],
  },
  {
    id: "promo-004",
    name: "Happy Hour: 2x1 en Bebidas",
    description:
      "De lunes a viernes, 5PM a 7PM, todas las bebidas no alcohólicas 2x1.",
    longDescription:
      "Nuestra promoción de Happy Hour te permite disfrutar de dos bebidas por el precio de una, de lunes a viernes de 5 PM a 7 PM. Aplicable a todas nuestras bebidas no alcohólicas, incluyendo limonadas artesanales, jugos naturales, refrescos y cafés especiales. ¡La forma perfecta de refrescarte después del trabajo!",
    discountType: "bundle",
    discountValue: 100,
    startDate: TODAY,
    endDate: NEXT_6_MONTHS,
    imageSrc:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1965&auto=format&fit=crop",
    active: true,
    applicableProducts: BEBIDAS_IDS,
    limitPerCustomer: 2,
    tags: ["Bebidas", "Happy Hour", "2x1"],
  },
  {
    id: "promo-005",
    name: "10% en Primera Compra",
    description:
      "10% de descuento en tu primer pedido con el código BIENVENIDO.",
    longDescription:
      "Como agradecimiento por elegirnos, ofrecemos un 10% de descuento en tu primer pedido. Esta promoción es válida para cualquier artículo de nuestro menú, sin mínimo de compra. Solo necesitas usar el código BIENVENIDO al momento de realizar tu pedido. ¡Una cálida bienvenida a la experiencia Colori!",
    discountType: "percentage",
    discountValue: 10,
    startDate: LAST_MONTH,
    endDate: NEXT_YEAR,
    imageSrc:
      "https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?q=80&w=1974&auto=format&fit=crop",
    active: true,
    applicableProducts: [],
    code: "BIENVENIDO",
    featured: true,
    tags: ["Nuevos clientes", "Código", "Bienvenida"],
  },
  {
    id: "promo-006",
    name: "Martes de Entradas",
    description: "Todas las entradas con 30% de descuento los martes.",
    longDescription:
      "Haz que tus martes sean más especiales con nuestras deliciosas entradas a un precio irresistible. Todos los martes ofrecemos un 30% de descuento en todas las entradas de nuestro menú. Una oportunidad perfecta para probar varias opciones y compartir diferentes sabores con tu mesa. No requiere código promocional.",
    discountType: "percentage",
    discountValue: 30,
    startDate: TODAY,
    endDate: NEXT_3_MONTHS,
    imageSrc:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1170&auto=format&fit=crop",
    active: true,
    applicableProducts: ENTRADAS_IDS,
    tags: ["Entradas", "Martes", "Gran descuento"],
  },
  {
    id: "promo-007",
    name: "Desayuno Completo",
    description:
      "Desayuno completo por $9.99: plato principal, bebida y postre pequeño.",
    longDescription:
      "Comienza tu día con energía por solo $9.99. Nuestro Desayuno Completo incluye un plato principal a elegir entre pancakes, huevos con tostadas o sandwich de desayuno, una bebida caliente o fría, y un mini postre. Disponible todos los días hasta las 11 AM. El precio regular de estos productos por separado sería aproximadamente $15.",
    discountType: "fixed",
    discountValue: 5.01,
    startDate: LAST_WEEK,
    endDate: NEXT_MONTH,
    imageSrc:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop",
    active: true,
    applicableProducts: [],
    tags: ["Desayuno", "Combo", "Precio especial"],
  },
  {
    id: "promo-008",
    name: "Noche de Parejas",
    description:
      "Cena romántica para dos por $49.99, incluye entrada, platos principales y postre.",
    longDescription:
      "Disfruta de una velada especial con tu pareja por solo $49.99. Nuestra Noche de Parejas incluye una entrada para compartir, dos platos principales a elección y un postre para compartir. También incluye dos bebidas no alcohólicas. Disponible todos los jueves, viernes y sábados a partir de las 7 PM. Reserva recomendada.",
    discountType: "fixed",
    discountValue: 15,
    startDate: TODAY,
    endDate: NEXT_3_MONTHS,
    imageSrc:
      "https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93?q=80&w=2070&auto=format&fit=crop",
    active: true,
    applicableProducts: [],
    code: "ROMANCE",
    featured: true,
    tags: ["Pareja", "Cena", "Romantico"],
  },
  {
    id: "promo-009",
    name: "Cumpleañero Come Gratis",
    description:
      "En el día de tu cumpleaños, tu plato principal es gratis con la compra de otro.",
    longDescription:
      "Celebra tu cumpleaños con nosotros y recibe tu plato principal completamente gratis con la compra de otro plato principal de igual o mayor valor. Solo necesitas presentar una identificación válida que muestre tu fecha de nacimiento. Válido únicamente el día de tu cumpleaños. No combinable con otras promociones.",
    discountType: "percentage",
    discountValue: 100,
    startDate: LAST_MONTH,
    endDate: NEXT_YEAR,
    imageSrc:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop",
    active: true,
    applicableProducts: PLATOS_PRINCIPALES_IDS,
    minimumPurchase: 15,
    tags: ["Cumpleaños", "Gratis", "Celebración"],
  },
  {
    id: "promo-010",
    name: "Menú Ejecutivo",
    description:
      "Menú de tres tiempos a precio especial de lunes a viernes, 12PM a 3PM.",
    longDescription:
      "Nuestro Menú Ejecutivo es perfecto para tu hora de almuerzo. Por solo $14.99, disfruta de una entrada a elegir, un plato principal y postre del día. Incluye también una bebida no alcohólica. Servido de lunes a viernes, de 12 PM a 3 PM. Una opción rápida y económica con la calidad que nos caracteriza.",
    discountType: "fixed",
    discountValue: 8,
    startDate: LAST_MONTH,
    endDate: NEXT_YEAR,
    imageSrc:
      "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?q=80&w=1933&auto=format&fit=crop",
    active: true,
    applicableProducts: [],
    tags: ["Almuerzo", "Menú Ejecutivo", "Económico"],
  },
  {
    id: "promo-011",
    name: "Fidelidad Colori",
    description:
      "Por cada 10 visitas, obtén $20 de descuento en tu próxima compra.",
    longDescription:
      "Premiamos tu fidelidad con nuestro programa Fidelidad Colori. Por cada 10 visitas con compras superiores a $15, recibirás $20 de descuento en tu próxima visita. Simplemente pide tu tarjeta de fidelidad en caja y preséntala en cada visita para acumular sellos. Válido por 6 meses desde la emisión del cupón de descuento.",
    discountType: "fixed",
    discountValue: 20,
    startDate: LAST_MONTH,
    endDate: NEXT_YEAR,
    imageSrc:
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2070&auto=format&fit=crop",
    active: true,
    applicableProducts: [],
    minimumPurchase: 15,
    tags: ["Fidelidad", "Recompensa", "Descuento"],
  },
  {
    id: "promo-012",
    name: "Temporada Navideña",
    description:
      "Especialidades navideñas con 20% de descuento durante diciembre.",
    longDescription:
      "Celebra la temporada festiva con nuestras creaciones especiales de Navidad. Durante todo diciembre, disfruta de un 20% de descuento en nuestra selección de platos y postres navideños, incluyendo nuestras famosas crepas de canela y manzana, chocolate con malvaviscos y ponche de frutas caliente. Una deliciosa manera de entrar en el espíritu navideño.",
    discountType: "percentage",
    discountValue: 20,
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    imageSrc:
      "https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=2070&auto=format&fit=crop",
    active: false,
    applicableProducts: ["501", "502", "503", "504"],
    featured: true,
    tags: ["Navidad", "Temporada", "Especial"],
  },
  {
    id: "promo-013",
    name: "Festival de Crepas",
    description:
      "Todas nuestras crepas especiales con 25% de descuento. ¡Temporada limitada!",
    longDescription:
      "Celebra con nosotros nuestro Festival de Crepas donde presentamos 5 nuevas creaciones exclusivas con un 25% de descuento. Prueba nuestras crepas de temporada que incluyen sabores únicos como mango-maracuyá, chocolate blanco con frutos rojos, plátano caramelizado con ron, y mucho más. Solo por tiempo limitado.",
    discountType: "percentage",
    discountValue: 25,
    startDate: TODAY,
    endDate: dateAfterDays(15), // Promoción de solo 15 días
    imageSrc:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=2070&auto=format&fit=crop",
    active: true,
    applicableProducts: POSTRES_IDS,
    featured: true,
    tags: ["Crepas", "Festival", "Temporal"],
  },
  {
    id: "promo-014",
    name: "Tarde de Café",
    description: "De 3PM a 5PM, café + postre por solo $7.99",
    longDescription:
      "Disfruta de una pausa en tu tarde con nuestra promoción especial de café. Por solo $7.99, obtén cualquier café de especialidad (hasta 16 oz) y un postre pequeño a elegir entre mini cheesecake, brownie o tartaleta de frutas. La combinación perfecta para recargar energías por la tarde.",
    discountType: "fixed",
    discountValue: 4,
    startDate: LAST_WEEK,
    endDate: NEXT_MONTH,
    imageSrc:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
    active: true,
    applicableProducts: [],
    tags: ["Café", "Postre", "Tarde"],
  },
  {
    id: "promo-015",
    name: "Domingo Familiar",
    description:
      "Niños comen gratis los domingos con la compra de un plato de adulto.",
    longDescription:
      "Haz que los domingos sean especiales para toda la familia. Por cada plato principal de adulto, un niño menor de 12 años recibe un plato del menú infantil completamente gratis. Incluye una bebida pequeña y un helado de postre. Disponible todos los domingos durante el horario de apertura. Máximo 2 menús infantiles gratis por mesa.",
    discountType: "percentage",
    discountValue: 100,
    startDate: LAST_WEEK,
    endDate: NEXT_3_MONTHS,
    imageSrc:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1547&auto=format&fit=crop",
    active: true,
    applicableProducts: ["701", "702", "703"], // IDs del menú infantil
    minimumPurchase: 12,
    tags: ["Familiar", "Niños", "Domingo"],
  },
];
