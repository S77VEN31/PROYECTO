import { Product } from "@/types/products";
import { mockCategories } from "./categories";
import { mockPromotions } from "./promotions";

// Función para comprobar si un producto tiene una promoción activa
const hasActivePromotion = (productId: string): boolean => {
  const now = new Date();
  return mockPromotions.some(
    (promo) =>
      promo.active &&
      new Date(promo.startDate) <= now &&
      new Date(promo.endDate) >= now &&
      promo.applicableProducts.includes(productId)
  );
};

// Función para obtener objetos de categoría a partir de IDs o nombres
const getCategoriesFromIds = (
  categoryIds: string[] | string
): (typeof mockCategories)[0][] => {
  const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
  return mockCategories.filter((cat) =>
    ids.some((id) => cat.id === id || cat.name === id || cat.slug === id)
  );
};

// Datos base de productos como array
export const mockProducts: Product[] = [
  // Entradas
  {
    id: "101",
    name: "Ensalada César",
    description:
      "Lechuga romana, pollo grillado, crutones, queso parmesano y aderezo césar",
    longDescription:
      "Nuestra ensalada césar es una opción fresca y saludable. Preparada con lechuga romana crujiente, crutones caseros, pechuga de pollo a la parrilla, queso parmesano y nuestro aderezo césar especial hecho en casa con anchoas frescas.",
    price: 12.99,
    imageSrc:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["1", "5"]),
    tags: ["saludable", "ligero"],
    nutritionalInfo: {
      calories: 350,
      protein: 25,
      carbs: 15,
      fat: 20,
      allergens: ["lácteos", "gluten"],
    },
    preparationTime: 10,
    available: true,
    isPromo: hasActivePromotion("101") || false,
  },
  {
    id: "103",
    name: "Nachos con Guacamole",
    description:
      "Crujientes totopos de maíz con guacamole fresco, pico de gallo y crema agria",
    longDescription:
      "Un clásico aperitivo mexicano que no puede faltar. Nuestros nachos caseros son crujientes y se sirven con un abundante guacamole hecho al momento con aguacates maduros, cebolla, cilantro, limón y un toque de jalapeño.",
    price: 10.99,
    imageSrc:
      "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=2035&auto=format&fit=crop",
    categories: getCategoriesFromIds(["1"]),
    tags: ["mexicano", "para compartir"],
    nutritionalInfo: {
      calories: 450,
      protein: 8,
      carbs: 40,
      fat: 30,
      allergens: ["lácteos"],
    },
    preparationTime: 12,
    available: true,
    isPromo: hasActivePromotion("103") || true,
  },
  {
    id: "106",
    name: "Ceviche de Pescado Blanco",
    description:
      "Pescado blanco marinado en jugo de limón con cebolla morada, cilantro y ají",
    longDescription:
      "Una deliciosa preparación de origen peruano. Utilizamos los mejores cortes de pescado blanco fresco, marinados en jugo de limón recién exprimido, mezclado con cebolla morada, cilantro fresco, ají limo y un toque de jengibre. Se sirve frío con chips de camote.",
    price: 13.99,
    imageSrc:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["1"]),
    tags: ["peruano", "fresco", "mariscos"],
    nutritionalInfo: {
      calories: 220,
      protein: 22,
      carbs: 10,
      fat: 8,
      allergens: ["pescado"],
    },
    preparationTime: 20,
    available: true,
    isPromo: hasActivePromotion("106") || true,
  },
  {
    id: "107",
    name: "Hummus con Pan Pita",
    description:
      "Puré de garbanzos con tahini, aceite de oliva, limón y especias",
    longDescription:
      "Nuestro hummus es una receta tradicional de oriente medio, elaborado con garbanzos cocidos, pasta de tahini, aceite de oliva virgen, zumo de limón, comino y un toque de pimentón. Servido con pan pita caliente y aceitunas kalamata.",
    price: 9.99,
    imageSrc:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=2098&auto=format&fit=crop",
    categories: getCategoriesFromIds(["1"]),
    tags: ["vegetariano", "oriental", "para compartir"],
    nutritionalInfo: {
      calories: 320,
      protein: 10,
      carbs: 35,
      fat: 18,
      allergens: ["sésamo", "gluten"],
    },
    preparationTime: 10,
    available: true,
    isPromo: hasActivePromotion("107") || false,
  },
  {
    id: "110",
    name: "Gyozas de Cerdo",
    description:
      "Empanadillas japonesas rellenas de cerdo y verduras con salsa ponzu",
    longDescription:
      "Nuestras gyozas artesanales están preparadas con masa fina y un delicioso relleno de carne de cerdo picada, col china, cebolleta, jengibre y ajo. Cocinadas al vapor y luego ligeramente doradas para obtener una textura perfecta. Servidas con nuestra salsa ponzu casera.",
    price: 10.99,
    imageSrc:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["1"]),
    tags: ["asiático", "japonés"],
    nutritionalInfo: {
      calories: 310,
      protein: 14,
      carbs: 32,
      fat: 15,
      allergens: ["gluten", "soja"],
    },
    preparationTime: 15,
    available: true,
    isPromo: hasActivePromotion("110") || false,
  },
  {
    id: "112",
    name: "Edamame con Sal Marina",
    description:
      "Vainas de soja verde al vapor con sal marina y un toque de limón",
    longDescription:
      "Vainas de edamame frescas, ligeramente cocidas al vapor para preservar su color y textura crujiente. Sazonadas con sal marina de grano grueso y un toque de ralladura de limón. Una entrada ligera, saludable y adictiva, perfecta para compartir.",
    price: 7.99,
    imageSrc:
      "https://images.unsplash.com/photo-1627308595216-439c00ade0fe?q=80&w=2035&auto=format&fit=crop",
    categories: getCategoriesFromIds(["1"]),
    tags: ["japonés", "vegetariano", "saludable"],
    nutritionalInfo: {
      calories: 180,
      protein: 12,
      carbs: 15,
      fat: 8,
      allergens: ["soja"],
    },
    preparationTime: 8,
    available: true,
    isPromo: hasActivePromotion("112") || false,
  },

  // Platos Principales
  {
    id: "201",
    name: "Filete Mignon",
    description:
      "Corte premium de carne de res con salsa de champiñones y guarnición de papas",
    longDescription:
      "Nuestro Filete Mignon es la estrella de nuestra carta. Un corte premium de carne de res, cocinado a la perfección según tu preferencia, bañado en una deliciosa salsa de champiñones y acompañado de una guarnición de papas doradas.",
    price: 32.99,
    imageSrc:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["premium", "especialidad"],
    nutritionalInfo: {
      calories: 650,
      protein: 40,
      carbs: 25,
      fat: 45,
      allergens: ["lácteos"],
    },
    preparationTime: 25,
    available: true,
    isPromo: hasActivePromotion("201") || true,
  },
  {
    id: "202",
    name: "Salmón a la Parrilla",
    description:
      "Filete de salmón a la parrilla con salsa de eneldo, limón y verduras asadas",
    longDescription:
      "Un plato saludable y delicioso. Nuestro salmón es cuidadosamente seleccionado y cocinado a la perfección en nuestra parrilla, conservando todos sus jugos y sabor natural.",
    price: 26.99,
    imageSrc:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["saludable", "pescado", "sin gluten"],
    nutritionalInfo: {
      calories: 420,
      protein: 35,
      carbs: 10,
      fat: 28,
      allergens: ["pescado"],
    },
    preparationTime: 20,
    available: true,
    isPromo: hasActivePromotion("202") || false,
  },
  {
    id: "203",
    name: "Risotto de Hongos Silvestres",
    description:
      "Arroz arborio cocinado lentamente con hongos silvestres y queso parmesano",
    longDescription:
      "Un plato italiano tradicional preparado con arroz arborio, cocinado lentamente en caldo de verduras casero, con una mezcla selecta de hongos silvestres, cebolla, vino blanco y terminado con mantequilla y queso parmesano rallado.",
    price: 22.99,
    imageSrc:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["vegetariano", "italiano"],
    nutritionalInfo: {
      calories: 520,
      protein: 12,
      carbs: 65,
      fat: 22,
      allergens: ["lácteos"],
    },
    preparationTime: 30,
    available: true,
    isPromo: hasActivePromotion("203") || true,
  },
  {
    id: "204",
    name: "Paella Valenciana",
    description: "Arroz con azafrán, pollo, conejo, judías verdes y garrofón",
    longDescription:
      "Nuestra paella valenciana es fiel a la receta tradicional. Preparada en paellera de hierro con arroz bomba, caldo casero, azafrán, pollo, conejo, judías verdes, garrofón y un sofrito de tomate y pimiento. Cocinada a fuego lento para lograr el socarrat perfecto.",
    price: 29.99,
    imageSrc:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["español", "arroces", "tradicional"],
    nutritionalInfo: {
      calories: 680,
      protein: 35,
      carbs: 75,
      fat: 25,
      allergens: [],
    },
    preparationTime: 45,
    available: true,
    isPromo: hasActivePromotion("204") || true,
  },
  {
    id: "205",
    name: "Lasaña Casera",
    description:
      "Capas de pasta fresca con ragú de carne, bechamel y queso gratinado",
    longDescription:
      "Una receta italiana clásica preparada con amor. Nuestra lasaña lleva capas de pasta fresca, un ragú lento de carne de res y cerdo, salsa bechamel cremosa y una mezcla de quesos italianos, todo horneado hasta conseguir una superficie dorada y burbujeante.",
    price: 19.99,
    imageSrc:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=2035&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["italiano", "pasta", "horneado"],
    nutritionalInfo: {
      calories: 720,
      protein: 35,
      carbs: 65,
      fat: 38,
      allergens: ["lácteos", "gluten", "huevo"],
    },
    preparationTime: 25,
    available: true,
    isPromo: hasActivePromotion("205") || false,
  },
  {
    id: "206",
    name: "Tacos de Cochinita Pibil",
    description:
      "Tres tacos de cerdo marinado en achiote con cebolla encurtida",
    longDescription:
      "Auténticos tacos mexicanos con cerdo marinado en achiote, naranja agria y especias, cocinado lentamente hasta que esté tierno y jugoso. Servidos en tortillas de maíz caseras y acompañados con cebolla morada encurtida, cilantro fresco y salsa habanero opcional.",
    price: 17.99,
    imageSrc:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["mexicano", "picante", "especialidad"],
    nutritionalInfo: {
      calories: 520,
      protein: 28,
      carbs: 45,
      fat: 25,
      allergens: [],
    },
    preparationTime: 20,
    available: true,
    isPromo: hasActivePromotion("206") || false,
  },
  {
    id: "207",
    name: "Curry Rojo Tailandés",
    description: "Curry aromático con leche de coco, verduras y pollo o tofu",
    longDescription:
      "Un aromático curry tailandés preparado con pasta de curry rojo casera, leche de coco cremosa, verduras frescas de temporada y tu elección de pollo tierno o tofu firme. Servido con arroz jazmín perfumado y decorado con hojas de albahaca tailandesa y chile fresco.",
    price: 18.99,
    imageSrc:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["tailandés", "picante", "curry"],
    nutritionalInfo: {
      calories: 580,
      protein: 25,
      carbs: 55,
      fat: 30,
      allergens: [],
    },
    preparationTime: 25,
    available: true,
    isPromo: hasActivePromotion("207") || true,
  },
  {
    id: "210",
    name: "Pad Thai",
    description:
      "Fideos de arroz salteados con huevo, camarones, tofu, cacahuetes y brotes",
    longDescription:
      "El plato más popular de la cocina tailandesa. Fideos de arroz salteados con huevo, camarones frescos, tofu, cebolleta, brotes de soja y un equilibrio perfecto de salsa de pescado, tamarindo y azúcar de palma. Servido con cacahuetes triturados, cilantro y un gajo de lima.",
    price: 17.99,
    imageSrc:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["tailandés", "fideos", "mariscos"],
    nutritionalInfo: {
      calories: 560,
      protein: 22,
      carbs: 70,
      fat: 20,
      allergens: ["crustáceos", "huevo", "soja", "frutos secos"],
    },
    preparationTime: 20,
    available: true,
    isPromo: hasActivePromotion("210") || true,
  },
  {
    id: "211",
    name: "Costillas BBQ",
    description:
      "Costillas de cerdo a la barbacoa con salsa casera y guarnición",
    longDescription:
      "Costillas de cerdo marinadas durante 24 horas, cocinadas lentamente a baja temperatura y terminadas en parrilla con nuestra salsa barbacoa casera. Tiernas y jugosas, se desprenden del hueso. Servidas con puré de patatas cremoso y ensalada de col americana.",
    price: 24.99,
    imageSrc:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["americano", "barbacoa", "carnes"],
    nutritionalInfo: {
      calories: 850,
      protein: 45,
      carbs: 40,
      fat: 55,
      allergens: ["lácteos"],
    },
    preparationTime: 30,
    available: true,
    isPromo: hasActivePromotion("211") || false,
  },
  {
    id: "213",
    name: "Ravioles de Ricotta y Espinacas",
    description: "Pasta rellena casera con salsa de mantequilla y salvia",
    longDescription:
      "Ravioles artesanales elaborados con masa fresca y rellenos de una mezcla cremosa de ricotta, espinacas, nuez moscada y queso parmesano. Servidos con una sencilla pero deliciosa salsa de mantequilla dorada y hojas de salvia fresca crujientes.",
    price: 18.99,
    imageSrc:
      "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?q=80&w=2069&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["italiano", "pasta", "vegetariano"],
    nutritionalInfo: {
      calories: 580,
      protein: 22,
      carbs: 55,
      fat: 32,
      allergens: ["lácteos", "gluten", "huevo"],
    },
    preparationTime: 25,
    available: true,
    isPromo: hasActivePromotion("213") || false,
  },
  {
    id: "214",
    name: "Hamburguesa Gourmet",
    description:
      "Hamburguesa de wagyu con queso brie, cebolla caramelizada y trufa",
    longDescription:
      "Nuestra hamburguesa premium está elaborada con carne de wagyu, cocinada al punto y servida en un pan brioche tostado con mantequilla. Cubierta con queso brie fundido, cebolla caramelizada con vino tinto, mayonesa de trufa y rúcula fresca. Acompañada de patatas fritas caseras.",
    price: 22.99,
    imageSrc:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["hamburguesa", "gourmet", "premium"],
    nutritionalInfo: {
      calories: 920,
      protein: 45,
      carbs: 50,
      fat: 60,
      allergens: ["lácteos", "gluten"],
    },
    preparationTime: 22,
    available: true,
    isPromo: hasActivePromotion("214") || true,
  },
  {
    id: "215",
    name: "Pulpo a la Gallega",
    description: "Pulpo cocido con patata, pimentón y aceite de oliva virgen",
    longDescription:
      "Un clásico de la gastronomía gallega. Tentáculos de pulpo cocidos a la perfección, tiernos por dentro y ligeramente crujientes por fuera, servidos sobre una cama de patatas cocidas. Aliñado generosamente con pimentón dulce y picante, sal gruesa y un buen chorro de aceite de oliva virgen extra.",
    price: 26.99,
    imageSrc:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=2074&auto=format&fit=crop",
    categories: getCategoriesFromIds(["2"]),
    tags: ["español", "gallego", "mariscos"],
    nutritionalInfo: {
      calories: 420,
      protein: 30,
      carbs: 35,
      fat: 18,
      allergens: ["moluscos"],
    },
    preparationTime: 30,
    available: true,
    isPromo: hasActivePromotion("215") || false,
  },

  // Postres
  {
    id: "301",
    name: "Tiramisú",
    description:
      "Postre italiano tradicional con capas de bizcocho, café y crema mascarpone",
    longDescription:
      "Nuestro tiramisú es el postre perfecto para los amantes del café. Elaborado de forma tradicional italiana con capas de bizcocho savoiardi empapado en café espresso, alternadas con una cremosa mezcla de mascarpone.",
    price: 9.99,
    imageSrc:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1974&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["dulce", "italiano"],
    nutritionalInfo: {
      calories: 400,
      protein: 7,
      carbs: 45,
      fat: 22,
      allergens: ["lácteos", "huevo", "gluten"],
    },
    preparationTime: 15,
    available: true,
    isPromo: hasActivePromotion("301") || true,
  },
  {
    id: "303",
    name: "Brownie con Helado",
    description: "Brownie casero de chocolate con nueces y helado de vainilla",
    longDescription:
      "Nuestro brownie es elaborado diariamente con chocolate negro de alta calidad, mantequilla y nueces tostadas. Tiene la textura perfecta: crujiente por fuera y húmedo por dentro. Servido caliente con helado de vainilla de Madagascar y salsa de chocolate fundido.",
    price: 9.99,
    imageSrc:
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=1974&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["chocolate", "caliente", "helado"],
    nutritionalInfo: {
      calories: 520,
      protein: 8,
      carbs: 55,
      fat: 30,
      allergens: ["lácteos", "gluten", "huevo", "frutos secos"],
    },
    preparationTime: 12,
    available: true,
    isPromo: hasActivePromotion("303") || true,
  },
  {
    id: "304",
    name: "Cheesecake de Frutos Rojos",
    description:
      "Tarta de queso cremosa con base de galleta y salsa de frutos rojos",
    longDescription:
      "Una tarta de queso perfectamente cremosa preparada con queso crema de primera calidad, nata fresca y un toque de vainilla, sobre una base crujiente de galleta. Cubierta con una generosa capa de salsa casera de frutos rojos (fresas, frambuesas y arándanos).",
    price: 8.99,
    imageSrc:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2070&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["tarta", "fruta", "cremoso"],
    nutritionalInfo: {
      calories: 450,
      protein: 7,
      carbs: 40,
      fat: 28,
      allergens: ["lácteos", "gluten"],
    },
    preparationTime: 15,
    available: true,
    isPromo: hasActivePromotion("304") || false,
  },
  {
    id: "306",
    name: "Crêpes Suzette",
    description:
      "Crêpes francesas flambeados con salsa de naranja y Grand Marnier",
    longDescription:
      "Un postre clásico francés que consiste en finas crêpes bañadas en una salsa de mantequilla, azúcar, zumo de naranja y licor Grand Marnier. El plato se flambea a un lado de la mesa, creando un espectáculo visual y aportando un sabor caramelizado único.",
    price: 11.99,
    imageSrc:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=2013&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["francés", "caliente", "especialidad"],
    nutritionalInfo: {
      calories: 420,
      protein: 5,
      carbs: 45,
      fat: 22,
      allergens: ["lácteos", "gluten", "huevo"],
    },
    preparationTime: 15,
    available: true,
    isPromo: hasActivePromotion("306") || true,
  },
  {
    id: "307",
    name: "Tarta de Manzana",
    description: "Tarta casera de manzana con canela y helado de vainilla",
    longDescription:
      "Una reconfortante tarta de manzana hecha con masa quebrada casera y rellena de manzanas frescas caramelizadas con canela, azúcar moreno y un toque de vainilla. Horneada hasta conseguir un dorado perfecto y servida caliente con una bola de helado de vainilla.",
    price: 8.99,
    imageSrc:
      "https://images.unsplash.com/photo-1562007908-17c67e878c88?q=80&w=2069&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["tarta", "manzana", "caliente"],
    nutritionalInfo: {
      calories: 420,
      protein: 5,
      carbs: 60,
      fat: 18,
      allergens: ["lácteos", "gluten", "huevo"],
    },
    preparationTime: 15,
    available: true,
    isPromo: hasActivePromotion("307") || false,
  },
  {
    id: "309",
    name: "Coulant de Chocolate",
    description:
      "Bizcocho de chocolate con interior fundido y helado de vainilla",
    longDescription:
      "Pequeño bizcocho de chocolate con un exterior cocido y un interior líquido que fluye al partirlo. Elaborado con chocolate negro de alta calidad y mantequilla, horneado con precisión para lograr el punto exacto. Servido caliente con helado de vainilla y polvo de cacao.",
    price: 9.99,
    imageSrc:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1965&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["chocolate", "caliente", "fundido"],
    nutritionalInfo: {
      calories: 450,
      protein: 7,
      carbs: 40,
      fat: 28,
      allergens: ["lácteos", "huevo", "gluten"],
    },
    preparationTime: 15,
    available: true,
    isPromo: hasActivePromotion("309") || true,
  },
  {
    id: "310",
    name: "Tarta de Queso Vasca",
    description: "Tarta de queso al estilo vasco, horneada a alta temperatura",
    longDescription:
      "Nuestra versión de la famosa tarta de queso vasca de La Viña, en San Sebastián. Una tarta cremosa, elaborada con queso cremoso de alta calidad, nata, huevos y azúcar, horneada a alta temperatura para conseguir un exterior caramelizado y un interior sedoso que se derrite en la boca.",
    price: 9.99,
    imageSrc:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["español", "vasco", "queso"],
    nutritionalInfo: {
      calories: 480,
      protein: 9,
      carbs: 35,
      fat: 32,
      allergens: ["lácteos", "huevo"],
    },
    preparationTime: 15,
    available: true,
    isPromo: hasActivePromotion("310") || false,
  },
  {
    id: "311",
    name: "Flan de Caramelo",
    description: "Suave flan casero con caramelo líquido y nata montada",
    longDescription:
      "Un postre tradicional español elaborado con huevos, leche, nata y azúcar, cocido a baño maría y cubierto con un caramelo líquido que aporta un delicioso contraste de sabores. Su textura es suave y cremosa. Servido frío con un toque de nata montada y menta fresca.",
    price: 7.99,
    imageSrc:
      "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=80&w=1974&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["español", "cremoso", "clásico"],
    nutritionalInfo: {
      calories: 350,
      protein: 8,
      carbs: 40,
      fat: 18,
      allergens: ["lácteos", "huevo"],
    },
    preparationTime: 10,
    available: true,
    isPromo: hasActivePromotion("311") || false,
  },
  {
    id: "313",
    name: "Helado Artesanal Variado",
    description: "Selección de tres sabores de helado artesanal",
    longDescription:
      "Una degustación de nuestros helados artesanales elaborados diariamente en nuestra cocina con ingredientes naturales y de temporada. Incluye tres bolas a elegir entre vainilla de Madagascar, chocolate belga, fresa silvestre, caramelo salado, pistacho, stracciatella o limón. Decorado con barquillos caseros.",
    price: 8.99,
    imageSrc:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1974&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["helado", "frío", "variado"],
    nutritionalInfo: {
      calories: 350,
      protein: 5,
      carbs: 35,
      fat: 20,
      allergens: ["lácteos", "frutos secos"],
    },
    preparationTime: 5,
    available: true,
    isPromo: hasActivePromotion("313") || false,
  },

  {
    id: "315",
    name: "Crème Brûlée",
    description:
      "Clásica crema cocida francesa con cobertura de azúcar caramelizado",
    longDescription:
      "Un postre francés clásico que consiste en una rica crema cocida infusionada con vainilla bourbon de Madagascar, cubierta con una capa de azúcar que se carameliza justo antes de servir para crear un contraste perfecto entre la cobertura crujiente y la cremosa natilla.",
    price: 9.99,
    imageSrc:
      "https://images.unsplash.com/photo-1488477304112-4944851de03d?q=80&w=1974&auto=format&fit=crop",
    categories: getCategoriesFromIds(["3"]),
    tags: ["francés", "cremoso", "caramelizado"],
    nutritionalInfo: {
      calories: 380,
      protein: 5,
      carbs: 35,
      fat: 25,
      allergens: ["lácteos", "huevo"],
    },
    preparationTime: 12,
    available: true,
    isPromo: hasActivePromotion("315") || true,
  },

  // Bebidas
  {
    id: "402",
    name: "Mojito Clásico",
    description: "Cóctel refrescante de ron, limón, hierbabuena, azúcar y soda",
    longDescription:
      "Nuestro mojito clásico es la combinación perfecta de ron blanco de calidad, zumo de lima fresca, hojas de hierbabuena machacadas, azúcar y un toque de agua con gas. Servido con hielo picado y una rodaja de lima.",
    price: 8.99,
    imageSrc:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1965&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["cóctel", "refrescante", "alcohol"],
    nutritionalInfo: {
      calories: 180,
      protein: 0,
      carbs: 15,
      fat: 0,
      allergens: [],
    },
    preparationTime: 8,
    available: true,
    isPromo: hasActivePromotion("402") || true,
  },
  {
    id: "403",
    name: "Smoothie Tropical",
    description: "Batido refrescante de frutas tropicales y yogur natural",
    longDescription:
      "Un smoothie repleto de vitaminas elaborado con una mezcla de frutas tropicales frescas como mango, piña y maracuyá, combinadas con yogur natural, un toque de miel y hielo picado. Una bebida equilibrada, refrescante y energética.",
    price: 6.99,
    imageSrc:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1908&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["fruta", "saludable", "sin alcohol"],
    nutritionalInfo: {
      calories: 220,
      protein: 5,
      carbs: 45,
      fat: 2,
      allergens: ["lácteos"],
    },
    preparationTime: 5,
    available: true,
    isPromo: hasActivePromotion("403") || false,
  },
  {
    id: "405",
    name: "Café Latte Artesanal",
    description: "Espresso con leche cremosa y arte latte",
    longDescription:
      "Un café equilibrado y suave elaborado con nuestro espresso de tueste medio y leche vaporizada aterciopelada. Cada taza es finalizada con arte latte, creando hermosos diseños en la superficie del café. Servido en taza grande.",
    price: 4.99,
    imageSrc:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1937&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["café", "caliente", "creativo"],
    nutritionalInfo: {
      calories: 150,
      protein: 5,
      carbs: 12,
      fat: 8,
      allergens: ["lácteos"],
    },
    preparationTime: 5,
    available: true,
    isPromo: hasActivePromotion("405") || true,
  },
  {
    id: "406",
    name: "Agua de Jamaica",
    description:
      "Infusión fría de flor de jamaica con un toque de limón y menta",
    longDescription:
      "Una refrescante bebida mexicana elaborada con flores de jamaica secas, infusionadas en agua caliente y luego enfriadas. Ligeramente endulzada y aromatizada con rodajas de limón fresco y hojas de menta. Una bebida antioxidante con un hermoso color rojo intenso.",
    price: 4.99,
    imageSrc:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1770&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["refrescante", "mexicano", "sin alcohol"],
    nutritionalInfo: {
      calories: 80,
      protein: 0,
      carbs: 20,
      fat: 0,
      allergens: [],
    },
    preparationTime: 5,
    available: true,
    isPromo: hasActivePromotion("406") || false,
  },
  {
    id: "407",
    name: "Matcha Latte",
    description: "Té verde matcha ceremonial con leche vaporizada",
    longDescription:
      "Una bebida japonesa elaborada con té verde matcha de calidad ceremonial, batido tradicionalmente hasta obtener una consistencia suave, combinado con leche vaporizada y un toque de miel. Reconfortante, energizante y llena de antioxidantes.",
    price: 5.99,
    imageSrc:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1965&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["té", "japonés", "saludable"],
    nutritionalInfo: {
      calories: 160,
      protein: 4,
      carbs: 18,
      fat: 8,
      allergens: ["lácteos"],
    },
    preparationTime: 6,
    available: true,
    isPromo: hasActivePromotion("407") || true,
  },
  {
    id: "408",
    name: "Cold Brew Coffee",
    description:
      "Café de extracción fría durante 12 horas, suave y refrescante",
    longDescription:
      "Nuestro cold brew se prepara infusionando granos de café de especialidad en agua fría durante 12 horas, lo que resulta en una bebida suave, menos ácida y naturalmente dulce. Servido con hielo y opcionalmente con un toque de leche o sirope de vainilla.",
    price: 5.99,
    imageSrc:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1965&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["café", "frío", "refrescante"],
    nutritionalInfo: {
      calories: 15,
      protein: 1,
      carbs: 2,
      fat: 0,
      allergens: [],
    },
    preparationTime: 3,
    available: true,
    isPromo: hasActivePromotion("408") || false,
  },
  {
    id: "410",
    name: "Margarita",
    description: "Cóctel clásico de tequila, triple sec y jugo de lima",
    longDescription:
      "Un cóctel mexicano refrescante y cítrico elaborado con tequila blanco de calidad, triple sec, jugo de lima recién exprimido y un toque de sirope de agave. Servido en copa escarchada con sal y una rodaja de lima. El equilibrio perfecto entre dulce, ácido y salado.",
    price: 9.99,
    imageSrc:
      "https://images.unsplash.com/photo-1556855810-ac404aa91e85?q=80&w=1976&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["cóctel", "mexicano", "alcohol"],
    nutritionalInfo: {
      calories: 220,
      protein: 0,
      carbs: 15,
      fat: 0,
      allergens: [],
    },
    preparationTime: 8,
    available: true,
    isPromo: hasActivePromotion("410") || false,
  },
  {
    id: "411",
    name: "Cerveza Artesanal IPA",
    description:
      "Cerveza India Pale Ale local con notas cítricas y amargor equilibrado",
    longDescription:
      "Una IPA de producción local, elaborada con una selección de lúpulos aromáticos que aportan notas cítricas y florales, con un amargor bien equilibrado. De color ámbar y cuerpo medio, es perfecta para los amantes de las cervezas con carácter.",
    price: 7.99,
    imageSrc:
      "https://images.unsplash.com/photo-1584225064536-d0fbc0a10f18?q=80&w=2074&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["cerveza", "artesanal", "alcohol"],
    nutritionalInfo: {
      calories: 200,
      protein: 2,
      carbs: 18,
      fat: 0,
      allergens: ["gluten", "cebada"],
    },
    preparationTime: 3,
    available: true,
    isPromo: hasActivePromotion("411") || true,
  },
  {
    id: "412",
    name: "Chocolate Caliente Belga",
    description:
      "Chocolate caliente cremoso elaborado con chocolate belga de alta calidad",
    longDescription:
      "Una indulgente bebida elaborada con chocolate belga de la más alta calidad, leche entera y nata, para lograr una textura increíblemente cremosa y un sabor profundo. Servido caliente y coronado con nata montada, virutas de chocolate y un toque de canela.",
    price: 5.99,
    imageSrc:
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=1974&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["chocolate", "caliente", "cremoso"],
    nutritionalInfo: {
      calories: 350,
      protein: 7,
      carbs: 40,
      fat: 18,
      allergens: ["lácteos"],
    },
    preparationTime: 7,
    available: true,
    isPromo: hasActivePromotion("412") || false,
  },
  {
    id: "415",
    name: "Frappe de Café",
    description: "Café batido con hielo, leche y sirope a elegir",
    longDescription:
      "Una refrescante bebida helada perfecta para los días calurosos. Preparada con café espresso, hielo, leche fría y tu elección de sirope (vainilla, caramelo o avellana). Todo batido hasta obtener una textura cremosa y coronado con nata montada y salsa de caramelo.",
    price: 5.99,
    imageSrc:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1769&auto=format&fit=crop",
    categories: getCategoriesFromIds(["4"]),
    tags: ["café", "frío", "dulce"],
    nutritionalInfo: {
      calories: 280,
      protein: 5,
      carbs: 40,
      fat: 10,
      allergens: ["lácteos"],
    },
    preparationTime: 7,
    available: true,
    isPromo: hasActivePromotion("415") || false,
  },
];

// Función auxiliar para buscar producto por ID
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};
