import React, { useState } from 'react';
import {
  UtensilsCrossed,
  MessageCircle,
  MapPin,
  Instagram,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Clock,
  QrCode,
  Share2
} from 'lucide-react';
import { STORE_INFO, isStoreOpenNow } from '../data/menuData';

interface BioHeroProps {
  onScrollToMenu: () => void;
  onOpenLocation: () => void;
  onOpenPix: () => void;
}

export const BioHero: React.FC<BioHeroProps> = ({
  onScrollToMenu,
  onOpenLocation,
  onOpenPix,
}) => {
  const storeStatus = isStoreOpenNow();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: STORE_INFO.name,
          text: STORE_INFO.slogan,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }
    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="relative pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        {/* Profile Avatar / Logo with decorative gourmet ring */}
        <div className="relative mb-4 group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#C5A059] via-[#8C593B] to-[#D9C3B0] blur-sm opacity-60 group-hover:opacity-90 transition duration-300" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-white shadow-md">
            <img
              src={STORE_INFO.logoUrl}
              alt="Carol Cafeteria Gourmet"
              className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // styled fallback container if image load fails
                const parent = (e.currentTarget as HTMLElement).parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full rounded-full bg-[#FAF0E6] flex flex-col items-center justify-center text-[#8C593B]">
                      <span class="font-serif font-bold text-2xl">C</span>
                      <span class="text-[9px] uppercase tracking-wider font-semibold">Carol</span>
                    </div>
                  `;
                }
              }}
            />
          </div>
          {/* Subtle Verified / Gourmet badge */}
          <div
            className="absolute bottom-1 right-1 bg-[#8C593B] text-white p-1.5 rounded-full shadow-md border-2 border-white"
            title="Cafeteria Gourmet Verificada"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A261D] tracking-tight mb-1 text-balance">
          {STORE_INFO.name}
        </h1>

        <p className="text-xs uppercase tracking-widest font-semibold text-[#8C593B] mb-2">
          Bolos · Tortas · Cafés Especiais
        </p>

        {/* Slogan */}
        <p className="text-sm text-[#6C5346] leading-relaxed max-w-sm mb-3 text-balance font-normal">
          "{STORE_INFO.slogan}"
        </p>

        {/* Live Status & Address Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#5B3929] mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDE2] border border-[#E8DEC8]">
            <Clock className="w-3.5 h-3.5 text-[#8C593B]" />
            <span className="font-medium">{storeStatus.statusText}</span>
          </span>
          <button
            onClick={onOpenLocation}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#F8F4EE] border border-[#E8DEC8] text-[#5B3929] transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="truncate max-w-[180px] sm:max-w-none">
              {STORE_INFO.address}
            </span>
          </button>
        </div>

        {/* Quick Utility Strip: PIX key + Share */}
        <div className="w-full grid grid-cols-2 gap-2 mb-6 max-w-sm">
          <button
            onClick={onOpenPix}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-[#FDFCFA] border border-[#E8DEC8] text-xs font-medium text-[#4A2E20] shadow-2xs hover:border-[#8C593B]/40 transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#C5A059]" />
            <span>Chave PIX Rápida</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-[#FDFCFA] border border-[#E8DEC8] text-xs font-medium text-[#4A2E20] shadow-2xs hover:border-[#8C593B]/40 transition-all cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#C5A059]" />
                <span>Compartilhar</span>
              </>
            )}
          </button>
        </div>

        {/* 🔘 THE 4 PRIMARY ACTION BUTTONS (CTAs) */}
        <div className="w-full space-y-3.5 max-w-sm text-left">
          {/* CTA 1: Ver Cardápio & Encomendar (Destaque Principal) */}
          <button
            onClick={onScrollToMenu}
            className="w-full group relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-[#8C593B] via-[#7D4D30] to-[#693E24] text-white shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border border-[#A67859]/30"
          >
            {/* Subtle light shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />

            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
                  <UtensilsCrossed className="w-5 h-5 text-[#FAF7F2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base sm:text-lg leading-tight">
                      Ver Cardápio & Encomendar
                    </span>
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#F9E2B2] text-[#4A2E20] rounded-md">
                      Destaque
                    </span>
                  </div>
                  <p className="text-xs text-[#EAD9CD] mt-0.5 leading-snug">
                    Nossos bolos, tortas e delícias a um clique.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-0.5 group-hover:text-white transition-all shrink-0" />
            </div>
          </button>

          {/* CTA 2: Fazer Pedido Personalizado via WhatsApp */}
          <a
            href={STORE_INFO.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full group rounded-2xl p-4 bg-white hover:bg-[#FDFBF7] text-[#2C2420] shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all border border-[#E8DEC8] hover:border-[#25D366]/40"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0 border border-[#25D366]/20">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <h2 className="font-semibold text-base text-[#3A261D] group-hover:text-[#25D366] transition-colors leading-tight">
                    Fazer Pedido Personalizado via WhatsApp
                  </h2>
                  <p className="text-xs text-[#7A6255] mt-0.5 leading-snug">
                    Fale direto com a nossa equipe.
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#A8988D] group-hover:text-[#25D366] transition-colors shrink-0" />
            </div>
          </a>

          {/* CTA 3: Como Chegar / Localização */}
          <button
            onClick={onOpenLocation}
            className="w-full group rounded-2xl p-4 bg-white hover:bg-[#FDFBF7] text-[#2C2420] shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all border border-[#E8DEC8] hover:border-[#8C593B]/40 cursor-pointer text-left"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#C5A059]/15 flex items-center justify-center shrink-0 border border-[#C5A059]/30">
                  <MapPin className="w-5 h-5 text-[#8C593B]" />
                </div>
                <div>
                  <h2 className="font-semibold text-base text-[#3A261D] group-hover:text-[#8C593B] transition-colors leading-tight">
                    Como Chegar / Localização
                  </h2>
                  <p className="text-xs text-[#7A6255] mt-0.5 leading-snug">
                    Avenida Minas Gerais, 1764 - Centro
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A8988D] group-hover:translate-x-0.5 group-hover:text-[#8C593B] transition-all shrink-0" />
            </div>
          </button>

          {/* CTA 4: Acompanhe no Instagram */}
          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full group rounded-2xl p-4 bg-white hover:bg-[#FDFBF7] text-[#2C2420] shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all border border-[#E8DEC8] hover:border-[#E1306C]/40"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#E1306C]/10 flex items-center justify-center shrink-0 border border-[#E1306C]/20">
                  <Instagram className="w-5 h-5 text-[#E1306C]" />
                </div>
                <div>
                  <h2 className="font-semibold text-base text-[#3A261D] group-hover:text-[#E1306C] transition-colors leading-tight">
                    Acompanhe no Instagram
                  </h2>
                  <p className="text-xs text-[#7A6255] mt-0.5 leading-snug">
                    @carol.bolosetortas · Fotos, novidades e bastidores
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#A8988D] group-hover:text-[#E1306C] transition-colors shrink-0" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
