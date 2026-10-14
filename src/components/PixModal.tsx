import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PixModal: React.FC<PixModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(STORE_INFO.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden border border-[#E8DEC8] flex flex-col p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F3EDE2] hover:bg-[#E8DEC8] text-[#5B3929] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-[#8C593B]/10 text-[#8C593B] flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-7 h-7" />
        </div>

        <h3 className="font-serif text-xl font-bold text-[#3A261D] mb-1">
          Chave PIX da Carol Cafeteria
        </h3>
        <p className="text-xs text-[#7A6255] mb-5">
          Para pagamentos antecipados e confirmação de encomendas gourmet.
        </p>

        {/* PIX Key Box */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] mb-4 space-y-2 text-left">
          <span className="text-[10px] uppercase font-bold text-[#8C593B] tracking-wider block">
            Tipo de Chave: Celular (WhatsApp)
          </span>
          <div className="flex items-center justify-between gap-2">
            <code className="text-sm font-mono font-bold text-[#3A261D]">
              {STORE_INFO.pixKey}
            </code>
            <span className="text-xs text-[#8C7669] font-medium">(34) 98869-4394</span>
          </div>
          <div className="pt-1 text-[11px] text-[#7A6255]">
            Favorecido: <strong>{STORE_INFO.pixName}</strong>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-[#8C593B] hover:bg-[#72452B] active:scale-98 text-white'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Chave PIX Copiada com Sucesso!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar Chave PIX</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-[#8C7669] mt-4 leading-relaxed">
          Após efetuar o pagamento, basta enviar o comprovante diretamente na nossa conversa do WhatsApp! ☕
        </p>
      </div>
    </div>
  );
};
