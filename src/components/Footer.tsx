import React from 'react';
import { Instagram, MessageCircle, MapPin, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

export const Footer: React.FC<{ onOpenLocation: () => void }> = ({
  onOpenLocation,
}) => {
  return (
    <footer className="border-t border-[#E8DEC8] bg-[#FAF7F2] pt-12 pb-24 sm:pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src={STORE_INFO.logoUrl}
            alt="Carol Cafeteria Gourmet"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-[#8C593B]/40"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== STORE_INFO.logoExternalUrl) {
                target.src = STORE_INFO.logoExternalUrl;
              }
            }}
          />
          <span className="font-serif text-lg font-bold text-[#3A261D]">
            Carol Cafeteria Gourmet
          </span>
        </div>

        <p className="text-xs text-[#7A6255] max-w-sm mb-6">
          {STORE_INFO.slogan}
        </p>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[#5B3929] mb-8">
          <a
            href={STORE_INFO.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8C593B] transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp: {STORE_INFO.phoneFormatted}</span>
          </a>

          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8C593B] transition-colors flex items-center gap-1.5"
          >
            <Instagram className="w-4 h-4 text-[#E1306C]" />
            <span>{STORE_INFO.instagram}</span>
          </a>

          <button
            onClick={onOpenLocation}
            className="hover:text-[#8C593B] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span>{STORE_INFO.address}</span>
          </button>
        </div>

        {/* Subtle note */}
        <div className="flex items-center gap-1.5 text-xs text-[#A8988D]">
          <span>© {new Date().getFullYear()} Carol Cafeteria Gourmet · Feito com carinho</span>
          <Heart className="w-3.5 h-3.5 text-[#8C593B] fill-current" />
        </div>
      </div>
    </footer>
  );
};
