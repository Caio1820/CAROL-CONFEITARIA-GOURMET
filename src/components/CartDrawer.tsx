import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  MapPin,
  Calendar,
  CreditCard,
  Banknote,
  QrCode,
  Copy,
  Check,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { CartItem, OrderForm, DeliveryType, PaymentMethod } from '../types';
import { STORE_INFO } from '../data/menuData';
import { formatCurrencyBRL, generateWhatsAppOrderUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [form, setForm] = useState<OrderForm>({
    customerName: '',
    customerPhone: '',
    deliveryType: 'retirada',
    address: '',
    neighborhood: '',
    scheduledDate: '',
    scheduledTime: '',
    paymentMethod: 'pix',
    notes: '',
    changeFor: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [pixCopied, setPixCopied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_INFO.pixKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handleSendOrder = () => {
    if (cart.length === 0) {
      setValidationError('Sua sacola está vazia.');
      return;
    }

    if (!form.customerName.trim()) {
      setValidationError('Por favor, informe seu nome para identificarmos o pedido.');
      return;
    }

    if (form.deliveryType === 'entrega' && !form.address.trim()) {
      setValidationError('Para entrega delivery, informe o endereço completo com rua e número.');
      return;
    }

    setValidationError(null);
    const whatsappUrl = generateWhatsAppOrderUrl(cart, form);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <aside className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8C593B]/10 flex items-center justify-center text-[#8C593B]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#3A261D]">
                Sua Sacola Gourmet
              </h2>
              <span className="text-[11px] text-[#8C7669]">
                {cart.length === 0
                  ? 'Nenhum item'
                  : `${cart.reduce((total, i) => total + i.quantity, 0)} ${
                      cart.reduce((total, i) => total + i.quantity, 0) === 1
                        ? 'item'
                        : 'itens'
                    }`}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar Sacola"
            className="w-8 h-8 rounded-full bg-[#F3EDE2] hover:bg-[#E8DEC8] text-[#5B3929] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#F3EDE2] text-[#8C593B] flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <p className="font-serif text-lg font-bold text-[#3A261D] mb-1">
                Sua sacola está vazia
              </p>
              <p className="text-xs text-[#7A6255] max-w-xs mx-auto mb-6">
                Explore o cardápio e adicione seus bolos, tortas e cafés favoritos!
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#8C593B] hover:bg-[#72452B] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Ver Cardápio
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#735A4D]">
                  <span>Itens Selecionados</span>
                  <button
                    onClick={onClearCart}
                    className="text-[#B94A48] hover:underline cursor-pointer normal-case font-medium"
                  >
                    Esvaziar
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-white p-3.5 rounded-2xl border border-[#E8DEC8] flex items-start gap-3 shadow-2xs"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#F0E6D8]"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs sm:text-sm text-[#3A261D] truncate leading-tight">
                          {item.name}
                        </h4>

                        {item.selectedOption && (
                          <p className="text-[11px] text-[#8C593B] mt-0.5 font-medium truncate">
                            {item.selectedOption}
                          </p>
                        )}

                        {item.observation && (
                          <p className="text-[10px] text-[#8C7669] italic mt-0.5">
                            Obs: "{item.observation}"
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F5ECE3]">
                          <span className="font-serif font-bold text-xs sm:text-sm text-[#3A261D] tabular-nums">
                            {formatCurrencyBRL(item.price * item.quantity)}
                          </span>

                          <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-0.5 rounded-lg border border-[#E8DEC8]">
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.cartItemId, item.quantity - 1)
                              }
                              className="w-6 h-6 rounded bg-white text-[#5B3929] flex items-center justify-center hover:bg-[#F3EDE2] text-xs transition-colors cursor-pointer"
                            >
                              {item.quantity === 1 ? (
                                <Trash2 className="w-3 h-3 text-[#B94A48]" />
                              ) : (
                                <Minus className="w-3 h-3" />
                              )}
                            </button>
                            <span className="w-5 text-center text-xs font-semibold tabular-nums text-[#3A261D]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.cartItemId, item.quantity + 1)
                              }
                              className="w-6 h-6 rounded bg-white text-[#5B3929] flex items-center justify-center hover:bg-[#F3EDE2] text-xs transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Form Details */}
              <div className="space-y-4 pt-2 border-t border-[#E8DEC8]">
                <h3 className="font-serif text-sm font-bold text-[#3A261D]">
                  Dados para o Atendimento
                </h3>

                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B3929] mb-1">
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, customerName: e.target.value }))
                    }
                    placeholder="Ex: Maria Silva"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D5C3] text-xs text-[#3A261D] placeholder-[#A09287] focus:outline-hidden focus:ring-2 focus:ring-[#8C593B]/30"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B3929] mb-1">
                    WhatsApp para Contato (opcional)
                  </label>
                  <input
                    type="tel"
                    value={form.customerPhone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, customerPhone: e.target.value }))
                    }
                    placeholder="(34) 99999-9999"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D5C3] text-xs text-[#3A261D] placeholder-[#A09287] focus:outline-hidden focus:ring-2 focus:ring-[#8C593B]/30"
                  />
                </div>

                {/* Delivery Type */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B3929] mb-1.5">
                    Como deseja receber seu pedido?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, deliveryType: 'retirada' }))
                      }
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        form.deliveryType === 'retirada'
                          ? 'bg-[#8C593B] text-white border-[#8C593B] shadow-2xs'
                          : 'bg-white border-[#E0D5C3] text-[#5B3929] hover:bg-[#FDFBF7]'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Retirada no Balcão</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, deliveryType: 'entrega' }))
                      }
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        form.deliveryType === 'entrega'
                          ? 'bg-[#8C593B] text-white border-[#8C593B] shadow-2xs'
                          : 'bg-white border-[#E0D5C3] text-[#5B3929] hover:bg-[#FDFBF7]'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Entrega Delivery</span>
                    </button>
                  </div>

                  {form.deliveryType === 'retirada' ? (
                    <p className="text-[11px] text-[#7A6255] mt-1.5 bg-[#F3EDE2] p-2 rounded-lg">
                      📍 <strong>Endereço de Retirada:</strong> {STORE_INFO.address}
                    </p>
                  ) : (
                    <div className="mt-2.5 space-y-2 bg-[#F6EFE5] p-3 rounded-xl border border-[#E8DEC8]">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5B3929] mb-0.5">
                          Endereço Completo com Número *
                        </label>
                        <input
                          type="text"
                          value={form.address}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, address: e.target.value }))
                          }
                          placeholder="Rua, número e complemento"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E0D5C3] text-xs text-[#3A261D]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5B3929] mb-0.5">
                          Bairro
                        </label>
                        <input
                          type="text"
                          value={form.neighborhood}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              neighborhood: e.target.value,
                            }))
                          }
                          placeholder="Seu bairro"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E0D5C3] text-xs text-[#3A261D]"
                        />
                      </div>
                      <p className="text-[10px] text-[#8C7669]">
                        * A taxa de entrega será confirmada no WhatsApp conforme o bairro.
                      </p>
                    </div>
                  )}
                </div>

                {/* Scheduling */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5B3929] mb-1">
                      Data Desejada
                    </label>
                    <input
                      type="date"
                      value={form.scheduledDate}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          scheduledDate: e.target.value,
                        }))
                      }
                      className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#E0D5C3] text-xs text-[#3A261D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5B3929] mb-1">
                      Horário Preferido
                    </label>
                    <input
                      type="time"
                      value={form.scheduledTime}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          scheduledTime: e.target.value,
                        }))
                      }
                      className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#E0D5C3] text-xs text-[#3A261D]"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B3929] mb-1.5">
                    Forma de Pagamento Pretendida
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {[
                      { id: 'pix', label: 'PIX (Chave)', icon: QrCode },
                      { id: 'cartao_credito', label: 'Cartão de Crédito', icon: CreditCard },
                      { id: 'cartao_debito', label: 'Cartão de Débito', icon: CreditCard },
                      { id: 'dinheiro', label: 'Dinheiro', icon: Banknote },
                    ].map((pm) => {
                      const Icon = pm.icon;
                      const isSelected = form.paymentMethod === pm.id;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              paymentMethod: pm.id as PaymentMethod,
                            }))
                          }
                          className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#8C593B]/10 border-[#8C593B] text-[#3A261D] font-semibold'
                              : 'bg-white border-[#E0D5C3] text-[#5B3929] hover:bg-[#FDFBF7]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 text-[#8C593B] shrink-0" />
                          <span className="truncate">{pm.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {form.paymentMethod === 'pix' && (
                    <div className="mt-2 p-2.5 rounded-xl bg-[#F4EDE2] border border-[#E5DAC8] flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#8C593B] block">
                          Chave PIX da Loja (Celular):
                        </span>
                        <code className="text-xs font-mono font-bold text-[#3A261D]">
                          {STORE_INFO.pixKey}
                        </code>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#8C593B] border border-[#E0D5C3] rounded-lg text-xs font-medium cursor-pointer transition-colors"
                      >
                        {pixCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {form.paymentMethod === 'dinheiro' && (
                    <div className="mt-2">
                      <label className="block text-[11px] font-semibold text-[#5B3929] mb-1">
                        Precisa de troco para quanto?
                      </label>
                      <input
                        type="text"
                        value={form.changeFor}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, changeFor: e.target.value }))
                        }
                        placeholder="Ex: R$ 100,00 ou Não preciso"
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#E0D5C3] text-xs text-[#3A261D]"
                      />
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B3929] mb-1">
                    Observações gerais para a confeitaria:
                  </label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    placeholder="Instruções para embalagem de presente, vela, mensagens..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D5C3] text-xs text-[#3A261D] placeholder-[#A09287] resize-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with Subtotal & WhatsApp Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E8DEC8] space-y-3">
            {validationError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6C5346]">Subtotal dos Produtos</span>
              <span className="font-serif text-xl font-bold text-[#3A261D] tabular-nums">
                {formatCurrencyBRL(subtotal)}
              </span>
            </div>

            <button
              onClick={handleSendOrder}
              className="w-full group relative overflow-hidden flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido para WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-center text-[#8C7669] leading-tight">
              O pedido será enviado estruturado diretamente para o WhatsApp oficial da Carol Cafeteria.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};

export const FloatingCartButton: React.FC<{
  count: number;
  total: number;
  onOpen: () => void;
}> = ({ count, total, onOpen }) => {
  if (count <= 0) return null;

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 max-w-md mx-auto pointer-events-none">
      <button
        onClick={onOpen}
        className="pointer-events-auto w-full bg-[#8C593B] hover:bg-[#784628] active:scale-98 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-white/20 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-2 bg-[#D9534F] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center tabular-nums">
              {count}
            </span>
          </div>
          <div className="text-left">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#F8E2CA]">
              Ver Sacola
            </span>
            <span className="text-xs text-[#FAF7F2] font-medium">
              {count} {count === 1 ? 'item adicionado' : 'itens adicionados'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-base tabular-nums">
            {formatCurrencyBRL(total)}
          </span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
