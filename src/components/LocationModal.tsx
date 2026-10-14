import React, { useState } from 'react';
import { X, MapPin, Clock, ExternalLink, Copy, Check, Navigation } from 'lucide-react';
import { STORE_INFO, isStoreOpenNow } from '../data/menuData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const storeStatus = isStoreOpenNow();

  if (!isOpen) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden border border-[#E8DEC8] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8C593B]/10 flex items-center justify-center text-[#8C593B]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#3A261D]">
                Como Chegar & Horários
              </h2>
              <span className="text-xs text-[#8C7669]">
                Carol Cafeteria Gourmet
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full bg-[#F3EDE2] hover:bg-[#E8DEC8] text-[#5B3929] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Address Box */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] space-y-3 shadow-2xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C593B]">
                  Endereço Oficial
                </span>
                <p className="text-base font-semibold text-[#3A261D] mt-0.5">
                  {STORE_INFO.address}
                </p>
                <p className="text-xs text-[#7A6255] mt-0.5">
                  Próximo aos principais pontos comerciais da cidade.
                </p>
              </div>

              <button
                onClick={handleCopyAddress}
                className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#E5DAC8] text-[#5B3929] transition-colors cursor-pointer shrink-0"
                title="Copiar endereço"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#8C593B] hover:bg-[#72452B] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Abrir no Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyAddress}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[#FDFBF7] border border-[#E0D5C3] text-[#5B3929] text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? 'Endereço Copiado!' : 'Copiar Endereço'}
              </button>
            </div>
          </div>

          {/* Operating Hours Table */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3A261D]">
                <Clock className="w-4 h-4 text-[#8C593B]" />
                <span>Horário de Funcionamento</span>
              </div>
              <span className="text-[11px] font-semibold text-[#8C593B] bg-[#F4EDE2] px-2.5 py-0.5 rounded-full">
                {storeStatus.statusText}
              </span>
            </div>

            <div className="divide-y divide-[#F5ECE3] text-xs">
              {STORE_INFO.hours.map((h, index) => (
                <div
                  key={index}
                  className="py-2.5 flex items-center justify-between gap-2"
                >
                  <span className="font-medium text-[#4A2E20]">{h.days}</span>
                  <span className="text-[#7A6255] text-right font-mono tabular-nums">
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Special notice */}
          <div className="p-3.5 rounded-2xl bg-[#F6EFE5] border border-[#E5DAC8] text-xs text-[#6C5346] leading-relaxed">
            🍰 <strong>Dica da Carol:</strong> Aceitamos retiradas de bolos e tortas inteiras agendadas previamente. Fatias individuais, salgados e cafés estão disponíveis para consumo no local ou entrega rápida!
          </div>
        </div>
      </div>
    </div>
  );
};
