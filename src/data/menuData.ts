import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // 1. Bolos Recheados & Confeitados
  {
    id: 'bolo-red-velvet',
    name: 'Bolo Red Velvet Especial',
    category: 'bolos',
    price: 135.00,
    description: 'Massa aveludada vermelho rubi, recheio cremoso e generoso de cream cheese frosting original com toque de baunilha de Madagascar, finalizado com frutas vermelhas frescas.',
    servings: 'Aprox. 1.8kg (15 a 18 fatias)',
    imageUrl: '/src/assets/images/cake_red_velvet_1791994460319.jpg',
    featured: true,
    tag: 'Mais Pedido',
    leadTimeNotice: 'Encomenda: 24h a 48h de antecedência',
    options: [
      { name: 'Inteiro Médio (1.8kg - 15 a 18 fatias)', priceDelta: 0 },
      { name: 'Inteiro Grande (2.5kg - 25 fatias)', priceDelta: 45.00 },
      { name: 'Fatia Individual Gourmet (Pronta Entrega)', priceDelta: -116.00 }, // R$ 19,00
    ]
  },
  {
    id: 'bolo-brigadeiro-belga',
    name: 'Bolo Brigadeiro Belga Supremo',
    category: 'bolos',
    price: 140.00,
    description: 'Pão de ló úmido de cacau 100%, dupla camada de brigadeiro gourmet artesanal com chocolate belga Callebaut e cobertura com drip chocolate e brigadeiros enrolados.',
    servings: 'Aprox. 2.0kg (18 a 20 fatias)',
    imageUrl: '/src/assets/images/cake_belgian_chocolate_1791994578826.jpg',
    featured: true,
    tag: 'Especial da Casa',
    leadTimeNotice: 'Encomenda: 24h de antecedência',
    options: [
      { name: 'Inteiro Médio (2.0kg)', priceDelta: 0 },
      { name: 'Inteiro Grande (3.0kg)', priceDelta: 60.00 },
      { name: 'Fatia Individual Gourmet', priceDelta: -121.00 }, // R$ 19,00
    ]
  },
  {
    id: 'bolo-ninho-nutella-morango',
    name: 'Bolo Ninho Trufado com Nutella & Morango',
    category: 'bolos',
    price: 145.00,
    description: 'Massa branca amanteigada levíssima, recheio aveludado de Leite Ninho artesanal, generosa camada de Nutella pura e morangos frescos selecionados.',
    servings: 'Aprox. 2.0kg (18 a 20 fatias)',
    imageUrl: '/src/assets/images/cake_red_velvet_1791994460319.jpg',
    tag: 'Queridinho',
    leadTimeNotice: 'Encomenda: 24h a 48h de antecedência',
    options: [
      { name: 'Inteiro Médio (2.0kg)', priceDelta: 0 },
      { name: 'Inteiro Grande (2.8kg)', priceDelta: 50.00 },
      { name: 'Fatia Individual (Balcão/Delivery)', priceDelta: -125.00 }, // R$ 20,00
    ]
  },

  // 2. Tortas Doces & Salgadas
  {
    id: 'torta-banoffee',
    name: 'Torta Banoffee Artesanal',
    category: 'tortas',
    price: 22.00, // Fatia como base ou inteira
    description: 'Base crocante amanteigada de biscoito, doce de leite artesanal cozido lentamente no ponto exato, bananas frescas fatiadas e chantilly fresco aromatizado polvilhado com cacau belga.',
    servings: 'Fatia generosa individual (ou opção inteira)',
    imageUrl: '/src/assets/images/pie_banoffee_artisanal_1791994463618.jpg',
    featured: true,
    tag: 'Sucesso Absoluto',
    leadTimeNotice: 'Fatia a pronta entrega | Inteira sob encomenda 24h',
    options: [
      { name: 'Fatia Individual Generosa (Aprox. 220g)', priceDelta: 0 },
      { name: 'Torta Inteira (12 a 14 fatias)', priceDelta: 98.00 }, // R$ 120,00
    ]
  },
  {
    id: 'torta-salgada-frango-catupiry',
    name: 'Torta Salgada de Frango Cremoso com Catupiry',
    category: 'tortas',
    price: 24.00,
    description: 'Massa podre artesanal que derrete na boca, recheio farto de peito de frango desfiado temperado com ervas finas da horta e legítimo Catupiry original.',
    servings: 'Fatia farta individual (ou opção inteira)',
    imageUrl: '/src/assets/images/pie_savory_chicken_1791994579911.jpg',
    featured: true,
    tag: 'Artesanal Salgada',
    leadTimeNotice: 'Fatia pronta entrega | Inteira sob encomenda 24h',
    options: [
      { name: 'Fatia Individual Aquecida (Aprox. 250g)', priceDelta: 0 },
      { name: 'Torta Inteira Grande (10 a 12 fatias)', priceDelta: 86.00 }, // R$ 110,00
    ]
  },
  {
    id: 'torta-holandesa',
    name: 'Torta Holandesa Tradicional Gourmet',
    category: 'tortas',
    price: 22.00,
    description: 'Biscoitos Calipso na borda, creme aerado holandês à base de manteiga e leite condensado e cobertura espelhada de ganache de chocolate meio amargo.',
    servings: 'Fatia individual (ou inteira sob encomenda)',
    imageUrl: '/src/assets/images/pie_banoffee_artisanal_1791994463618.jpg',
    leadTimeNotice: 'Fatia a pronta entrega | Inteira sob encomenda 24h',
    options: [
      { name: 'Fatia Individual (Aprox. 200g)', priceDelta: 0 },
      { name: 'Torta Inteira (12 fatias)', priceDelta: 93.00 }, // R$ 115,00
    ]
  },

  // 3. Cafés & Bebidas Especiais
  {
    id: 'cafe-cappuccino-italiano',
    name: 'Cappuccino Italiano Carol com Cacau Belga',
    category: 'cafes',
    price: 15.00,
    description: 'Espresso duplo tirado na hora com grãos especiais 100% arábica, leite vaporizado com microespuma sedosa e finalização com cacau belga 100% e raspas de canela.',
    servings: 'Xícara 200ml',
    imageUrl: '/src/assets/images/coffee_cappuccino_gourmet_1791994462535.jpg',
    featured: true,
    tag: 'Especial Barista',
    leadTimeNotice: 'Pronta entrega na cafeteria & Delivery expresso',
    options: [
      { name: 'Tradicional com Cacau Belga (200ml)', priceDelta: 0 },
      { name: 'Versão Gelada / Iced Cappuccino (300ml)', priceDelta: 3.00 },
      { name: 'Com Borda de Nutella ou Doce de Leite', priceDelta: 4.50 },
    ]
  },
  {
    id: 'cafe-caramelo-macchiato',
    name: 'Caramel Macchiato Gourmet',
    category: 'cafes',
    price: 17.50,
    description: 'Camadas perfeitas de leite vaporizado aromatizado com xarope artesanal de baunilha, dose de espresso arábica encorpado e calda densa de caramelo salgado tostado.',
    servings: 'Copo térmico/xícara 280ml',
    imageUrl: '/src/assets/images/coffee_cappuccino_gourmet_1791994462535.jpg',
    tag: 'Doce & Equilibrado',
    leadTimeNotice: 'Pronta entrega',
    options: [
      { name: 'Quente (280ml)', priceDelta: 0 },
      { name: 'Gelado com Gelo de Café (350ml)', priceDelta: 2.50 },
    ]
  },
  {
    id: 'soda-italiana-frutas',
    name: 'Soda Italiana Artesanal Refrescante',
    category: 'cafes',
    price: 14.00,
    description: 'Água gaseificada premium, xarope francês Monin, fatias de frutas frescas, hortelã e gelo cristalino.',
    servings: 'Taça 400ml',
    imageUrl: '/src/assets/images/coffee_cappuccino_gourmet_1791994462535.jpg',
    leadTimeNotice: 'Pronta entrega',
    options: [
      { name: 'Maçã Verde com Hortelã', priceDelta: 0 },
      { name: 'Frutas Vermelhas & Limão Siciliano', priceDelta: 0 },
      { name: 'Tangerina com Gengibre', priceDelta: 0 },
    ]
  },

  // 4. KITS & Encomendas Especiais
  {
    id: 'kit-festa-pocket',
    name: 'Kit Festa Pocket Celebração',
    category: 'kits',
    price: 185.00,
    description: 'Perfeito para pequenas comemorações inesquecíveis: 1 Mini Bolo Gourmet confeitado (rende 8 a 10 fatias), 20 brigadeiros artesanais sortidos (Belga, Ninho e Churros) e vela palito dourada.',
    servings: 'Serve até 8 pessoas',
    imageUrl: '/src/assets/images/gift_kit_gourmet_1791994463599.jpg',
    featured: true,
    tag: 'Presente & Eventos',
    leadTimeNotice: 'Encomenda com 24h de antecedência',
    options: [
      { name: 'Mini Bolo Brigadeiro Belga + 20 Docinhos', priceDelta: 0 },
      { name: 'Mini Bolo Red Velvet + 20 Docinhos', priceDelta: 10.00 },
      { name: 'Mini Bolo Ninho Nutella + 20 Docinhos', priceDelta: 10.00 },
    ]
  },
  {
    id: 'caixa-degustacao-doces',
    name: 'Caixa Degustação Doces Finos & Macarons',
    category: 'kits',
    price: 68.00,
    description: 'Caixa cartonada de presente com visor transparente, contendo 12 doces gourmet artesanais selecionados: brigadeiro belga noir, ninho com nutella, pistache com chocolate branco e macarons.',
    servings: '12 unidades gourmet',
    imageUrl: '/src/assets/images/gift_kit_gourmet_1791994463599.jpg',
    tag: 'Opção para Presente',
    leadTimeNotice: 'Pronta entrega limitada ou encomenda',
    options: [
      { name: 'Caixa com 12 unidades sortidas', priceDelta: 0 },
      { name: 'Caixa Luxo com 20 unidades sortidas', priceDelta: 40.00 },
    ]
  },
  {
    id: 'cesta-cafe-da-manha',
    name: 'Cesta Café da Manhã & Afeto Gourmet',
    category: 'kits',
    price: 160.00,
    description: 'Caixa em madeira rústica com laço de cetim: 1 Drip Coffee especial, 1 xícara cerâmica exclusiva, 2 croissants amanteigados, 1 fatia de bolo caseiro, geleia de frutas vermelhas artesanal, mini banoffee e cartão personalizado.',
    servings: 'Presente especial para 1 ou 2 pessoas',
    imageUrl: '/src/assets/images/gift_kit_gourmet_1791994463599.jpg',
    tag: 'Edição Especial',
    leadTimeNotice: 'Encomenda com no mínimo 24h de antecedência',
  }
];

export const STORE_INFO = {
  name: 'Carol Cafeteria Gourmet',
  slogan: 'O sabor do carinho em cada detalhe. Faça seu pedido de forma rápida e descomplicada!',
  phoneFormatted: '(34) 98869-4394',
  whatsappRaw: '5534988694394',
  whatsappDirectUrl: 'https://wa.me/5534988694394?text=Ol%C3%A1!%20Vim%20pelo%20BioSite%20e%20gostaria%20de%20fazer%20um%20pedido',
  address: 'Avenida Minas Gerais, 1764 - Centro',
  mapsUrl: 'https://maps.app.goo.gl/RwEdV6tdfQvna9JF7',
  instagram: '@carol.bolosetortas',
  instagramUrl: 'https://www.instagram.com/carol.bolosetortas',
  logoUrl: 'https://i.postimg.cc/CxTBbmBT/logo-carol.jpg',
  pixKey: '34988694394',
  pixName: 'Carol Cafeteria Gourmet Ltda',
  hours: [
    { days: 'Terça a Sexta-feira', time: '09:00 às 19:00' },
    { days: 'Sábado', time: '09:00 às 19:00' },
    { days: 'Domingo', time: '13:00 às 18:00' },
    { days: 'Segunda-feira', time: 'Fechado (Produção artesanal & encomendas)' },
  ],
  leadTimePolicy: 'Bolos e tortas inteiras sob encomenda com 24h a 48h de antecedência. Fatias, doces e cafés a pronta entrega no balcão e delivery rápido!',
};

export function isStoreOpenNow(): { isOpen: boolean; statusText: string } {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  // Monday
  if (day === 1) {
    return { isOpen: false, statusText: 'Fechado hoje (Produção artesanal)' };
  }
  // Sunday
  if (day === 0) {
    const openTime = 13 * 60; // 13:00
    const closeTime = 18 * 60; // 18:00
    if (currentTime >= openTime && currentTime < closeTime) {
      return { isOpen: true, statusText: 'Aberto agora até 18:00' };
    }
    return { isOpen: false, statusText: 'Fechado (Abre domingo às 13:00)' };
  }
  // Tuesday to Saturday
  const openTime = 9 * 60; // 09:00
  const closeTime = 19 * 60; // 19:00
  if (currentTime >= openTime && currentTime < closeTime) {
    return { isOpen: true, statusText: 'Aberto agora até 19:00' };
  }
  return { isOpen: false, statusText: 'Fechado no momento (Abre às 09:00)' };
}
