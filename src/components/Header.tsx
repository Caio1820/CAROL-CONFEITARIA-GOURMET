import React from 'react';
import { ShoppingBag, MapPin, Instagram, Clock } from 'lucide-react';
import { STORE_INFO, isStoreOpenNow } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenLocation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenLocation,
}) => {
  const storeStatus = isStoreOpenNow();

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]/80 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with official avatar */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <img
            src={STORE_INFO.logoUrl}
            alt="Carol Cafeteria Gourmet"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#C5A059]/40 group-hover:ring-[#8C593B] transition-all"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-[#3A261D] group-hover:text-[#8C593B] transition-colors whitespace-nowrap">
              Carol Cafeteria
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#8C593B] font-semibold -mt-1">
              Gourmet
            </span>
          </div>
        </a>

        {/* Zone 2: Clean nav links */}
        <nav className="hidden sm:flex items-center gap-6 text-xs md:text-sm font-medium text-[#5B3929]">
          <a
            href="#cardapio"
            className="hover:text-[#8C593B] transition-colors whitespace-nowrap"
          >
            Cardápio Digital
          </a>
          <button
            onClick={onOpenLocation}
            className="hover:text-[#8C593B] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Localização</span>
          </button>
          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8C593B] transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Instagram</span>
          </a>
        </nav>

        {/* Zone 3: Actions - Store open badge + Cart trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F3EDE2] text-[#5B3929] text-xs">
            <Clock className="w-3 h-3 text-[#8C593B]" />
            <span className="tabular-nums font-medium">{storeStatus.statusText}</span>
          </div>

          <button
            onClick={onOpenCart}
            aria-label="Abrir Sacola de Pedidos"
            className="relative flex items-center gap-2 bg-[#8C593B] hover:bg-[#72452B] active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Sacola</span>
            {cartCount > 0 && (
              <span className="bg-[#D9534F] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
