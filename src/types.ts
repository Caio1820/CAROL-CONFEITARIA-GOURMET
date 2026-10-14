export type CategoryId = 'todos' | 'bolos' | 'tortas' | 'cafes' | 'kits';

export interface ProductOption {
  name: string;
  priceDelta: number; // additional price in BRL
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  servings?: string;
  imageUrl: string;
  featured?: boolean;
  tag?: string;
  leadTimeNotice?: string; // e.g. "Pronta entrega" or "Encomenda 24h a 48h"
  options?: ProductOption[];
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOption?: string;
  observation?: string;
  imageUrl: string;
}

export type DeliveryType = 'retirada' | 'entrega';
export type PaymentMethod = 'pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro';

export interface OrderForm {
  customerName: string;
  customerPhone: string;
  deliveryType: DeliveryType;
  address: string;
  neighborhood: string;
  scheduledDate: string;
  scheduledTime: string;
  paymentMethod: PaymentMethod;
  notes: string;
  changeFor?: string;
}
