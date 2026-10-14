import { CartItem, OrderForm } from '../types';
import { STORE_INFO } from '../data/menuData';

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function generateWhatsAppOrderUrl(cart: CartItem[], form: OrderForm): string {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const lines: string[] = [];
  lines.push(`✨ *NOVO PEDIDO - CAROL CAFETERIA GOURMET* ✨`);
  lines.push(`Olá! Montei meu pedido pelo BioSite e gostaria de confirmar:`);
  lines.push(``);
  lines.push(`👤 *Cliente:* ${form.customerName || 'Não informado'}`);
  if (form.customerPhone) {
    lines.push(`📱 *Telefone/WhatsApp:* ${form.customerPhone}`);
  }
  lines.push(``);

  lines.push(`🛒 *ITENS DO PEDIDO:*`);
  cart.forEach((item, index) => {
    lines.push(`${index + 1}. *${item.quantity}x* ${item.name}`);
    if (item.selectedOption) {
      lines.push(`   ▫️ _Opção:_ ${item.selectedOption}`);
    }
    if (item.observation) {
      lines.push(`   ▫️ _Obs:_ ${item.observation}`);
    }
    lines.push(`   ▫️ _Valor:_ ${formatCurrencyBRL(item.price * item.quantity)}`);
  });

  lines.push(``);
  lines.push(`💰 *TOTAL DO PEDIDO:* ${formatCurrencyBRL(subtotal)}`);
  lines.push(``);

  lines.push(`📦 *MODALIDADE DE ENTREGA:*`);
  if (form.deliveryType === 'retirada') {
    lines.push(`• *Retirada no Balcão* (Av. Minas Gerais, 1764 - Centro)`);
  } else {
    lines.push(`• *Entrega Delivery:*`);
    lines.push(`  Endereço: ${form.address || 'A combinar'}`);
    if (form.neighborhood) {
      lines.push(`  Bairro: ${form.neighborhood}`);
    }
    lines.push(`  _(Taxa de entrega a ser informada pela cafeteria)_`);
  }

  if (form.scheduledDate || form.scheduledTime) {
    lines.push(``);
    lines.push(`📅 *DATA E HORÁRIO PREFERENCIAL:*`);
    if (form.scheduledDate) lines.push(`• Data: ${form.scheduledDate}`);
    if (form.scheduledTime) lines.push(`• Horário: ${form.scheduledTime}`);
  }

  lines.push(``);
  lines.push(`💳 *FORMA DE PAGAMENTO:*`);
  switch (form.paymentMethod) {
    case 'pix':
      lines.push(`• PIX (Chave: ${STORE_INFO.pixKey})`);
      break;
    case 'cartao_credito':
      lines.push(`• Cartão de Crédito`);
      break;
    case 'cartao_debito':
      lines.push(`• Cartão de Débito`);
      break;
    case 'dinheiro':
      lines.push(`• Dinheiro ${form.changeFor ? `(Troco para: ${form.changeFor})` : ''}`);
      break;
  }

  if (form.notes) {
    lines.push(``);
    lines.push(`📝 *OBSERVAÇÕES ADICIONAIS:*`);
    lines.push(`${form.notes}`);
  }

  lines.push(``);
  lines.push(`Aguardando a confirmação da disponibilidade e tempo estimado. Muito obrigado! ☕🍰`);

  const fullMessage = lines.join('\n');
  return `https://wa.me/${STORE_INFO.whatsappRaw}?text=${encodeURIComponent(fullMessage)}`;
}
