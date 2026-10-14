import React from 'react';
import { Send, Clock, AlertCircle } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

export const LeadTimeBanner: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 py-2">
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Instruction Card */}
        <div className="bg-[#FAF3EA] border border-[#E5D7C3] rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-[#8C593B] text-white flex items-center justify-center shrink-0 mt-0.5">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-[#8C593B] block">
              Agilidade no seu atendimento
            </span>
            <p className="text-sm font-medium text-[#3A261D] mt-0.5">
              Selecione seus itens favoritos no cardápio e envie o resumo direto para o nosso WhatsApp já pronto!
            </p>
          </div>
        </div>

        {/* Lead Time & Order Notice */}
        <div className="bg-white border border-[#EAE3D6] rounded-2xl p-3.5 flex items-start gap-3 text-xs text-[#6C5346]">
          <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#3A261D]">Regras de Encomenda: </span>
            <span>{STORE_INFO.leadTimePolicy}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
