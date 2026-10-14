import React, { useState } from 'react';
import { X, Plus, Minus, Clock, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { MenuItem, ProductOption } from '../types';
import { formatCurrencyBRL } from '../utils/whatsapp';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedOption?: ProductOption,
    observation?: string
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<ProductOption | undefined>(
    item.options && item.options.length > 0 ? item.options[0] : undefined
  );
  const [observation, setObservation] = useState('');
  const [added, setAdded] = useState(false);

  const basePrice = item.price;
  const currentPrice = selectedOption
    ? Math.max(0, basePrice + selectedOption.priceDelta)
    : basePrice;
  const totalPrice = currentPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedOption, observation.trim() || undefined);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden border border-[#E8DEC8] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#3A261D] flex items-center justify-center shadow-md backdrop-blur-sm transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 p-0">
          {/* Product Hero Image */}
          <div className="relative aspect-16/10 sm:aspect-16/9 bg-[#F0E6D8] overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {item.tag && (
              <div className="absolute bottom-3 left-3 bg-[#2C201A]/85 backdrop-blur-xs text-[#FAF7F2] px-3 py-1 rounded-md text-xs font-semibold">
                {item.tag}
              </div>
            )}
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C593B] font-medium mb-1">
                {item.servings && <span>{item.servings}</span>}
                {item.servings && item.leadTimeNotice && <span>·</span>}
                {item.leadTimeNotice && (
                  <span className="flex items-center gap-1 text-[#C5A059] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.leadTimeNotice}</span>
                  </span>
                )}
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#3A261D] leading-tight">
                {item.name}
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm text-[#6C5346] leading-relaxed">
              {item.description}
            </p>

            {/* Options Selection (if available) */}
            {item.options && item.options.length > 0 && (
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3A261D] mb-2.5">
                  Escolha o Tamanho ou Versão:
                </label>
                <div className="space-y-2">
                  {item.options.map((opt, idx) => {
                    const isSelected = selectedOption?.name === opt.name;
                    const optPrice = Math.max(0, item.price + opt.priceDelta);

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#8C593B]/10 border-[#8C593B] text-[#3A261D] shadow-2xs'
                            : 'bg-white border-[#E5DAC8] text-[#5B3929] hover:bg-[#FDFBF7]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-[#8C593B] bg-[#8C593B]'
                                : 'border-[#C5B5A5] bg-white'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{opt.name}</span>
                        </div>
                        <span className="font-serif font-bold text-sm tabular-nums text-[#3A261D]">
                          {formatCurrencyBRL(optPrice)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Observation field */}
            <div className="pt-1">
              <label
                htmlFor="item-obs"
                className="block text-xs font-semibold text-[#5B3929] mb-1.5"
              >
                Observação para este item (opcional):
              </label>
              <textarea
                id="item-obs"
                rows={2}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Ex: Sem canela, mensagem de parabéns na caixa, vela palito..."
                className="w-full p-2.5 rounded-xl bg-white border border-[#E0D5C3] text-xs text-[#3A261D] placeholder-[#A8988D] focus:outline-hidden focus:ring-2 focus:ring-[#8C593B]/30 focus:border-[#8C593B] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E8DEC8] flex items-center justify-between gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-[#F6EFE5] p-1 rounded-xl border border-[#E5DAC8]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5B3929] hover:bg-[#FAF7F2] active:scale-95 disabled:opacity-40 transition-all cursor-pointer shadow-2xs"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-bold font-serif tabular-nums text-[#3A261D]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5B3929] hover:bg-[#FAF7F2] active:scale-95 transition-all cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-sm ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#8C593B] hover:bg-[#72452B] active:scale-98 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Adicionado com sucesso!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar · {formatCurrencyBRL(totalPrice)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
