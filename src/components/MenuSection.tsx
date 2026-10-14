import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Clock, Check } from 'lucide-react';
import { CategoryId, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { formatCurrencyBRL } from '../utils/whatsapp';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

const CATEGORIES: { id: CategoryId; label: string; icon: string }[] = [
  { id: 'todos', label: 'Todos os Itens', icon: '✨' },
  { id: 'bolos', label: 'Bolos Confeitados', icon: '🎂' },
  { id: 'tortas', label: 'Tortas & Fatias', icon: '🥧' },
  { id: 'cafes', label: 'Cafés & Bebidas', icon: '☕' },
  { id: 'kits', label: 'Kits & Presentes', icon: '🎁' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'todos' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.options && item.options.length > 0) {
      // If item has customizable options, open modal
      onSelectItem(item);
    } else {
      onQuickAdd(item);
      setRecentlyAddedId(item.id);
      setTimeout(() => setRecentlyAddedId(null), 1800);
    }
  };

  return (
    <section id="cardapio" className="pt-8 pb-16 px-4 sm:px-6 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C593B] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Vitrine Digital de Pedidos</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A261D] tracking-tight">
            Cardápio & Encomendas Gourmet
          </h2>
          <p className="text-sm text-[#735A4D] mt-1 text-balance">
            Escolha suas delícias artesanais, adicione à sacola e envie direto ao WhatsApp da Carol Cafeteria.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E8B7F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar bolos, tortas, cappuccino, kits..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E0D5C3] text-sm text-[#3A261D] placeholder-[#A09287] focus:outline-hidden focus:ring-2 focus:ring-[#8C593B]/30 focus:border-[#8C593B] shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9E8B7F] hover:text-[#3A261D] cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Category Filter Tabs (Interactive segmented buttons) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center mb-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#8C593B] text-white shadow-xs'
                    : 'bg-white hover:bg-[#F8F4EE] text-[#5B3929] border border-[#E8DEC8]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-[#EAE3D6] max-w-md mx-auto">
            <p className="font-serif text-lg text-[#3A261D] font-semibold mb-1">
              Nenhum item encontrado
            </p>
            <p className="text-xs text-[#735A4D] mb-4">
              Não encontramos delícias correspondentes a "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#8C593B] text-white rounded-xl hover:bg-[#72452B] transition-colors cursor-pointer"
            >
              Limpar busca e ver tudo
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isJustAdded = recentlyAddedId === item.id;
            const hasOptions = item.options && item.options.length > 0;

            return (
              <article
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group flex flex-col bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden hover:shadow-md hover:border-[#8C593B]/40 transition-all cursor-pointer relative"
              >
                {/* Image Slot with Fallback Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#F3EDE2]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const parent = (e.currentTarget as HTMLElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex flex-col items-center justify-center bg-[#FAF4ED] text-[#8C593B] p-4 text-center">
                            <span class="text-3xl mb-1">🍰</span>
                            <span class="font-serif font-semibold text-sm text-[#3A261D]">${item.name}</span>
                          </div>
                        `;
                      }
                    }}
                  />

                  {/* Clean text tag without pill sandwich */}
                  {item.tag && (
                    <div className="absolute top-2.5 left-2.5 bg-[#2C201A]/85 backdrop-blur-xs text-[#F8F4EE] px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide">
                      {item.tag}
                    </div>
                  )}

                  {/* Serving notice badge */}
                  {item.servings && (
                    <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#3A261D] px-2 py-0.5 rounded-md text-[10px] font-medium border border-[#E5DAC8]">
                      {item.servings}
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#8C593B] font-medium mb-1">
                    {item.leadTimeNotice && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C5A059]" />
                        <span>{item.leadTimeNotice}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#3A261D] group-hover:text-[#8C593B] transition-colors leading-snug mb-1.5">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#6C5346] line-clamp-2 leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>

                  {/* Footer with Price and Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0EAE1] mt-auto">
                    <div>
                      <span className="text-[11px] text-[#8C7669] block">
                        {hasOptions ? 'A partir de' : 'Preço'}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#3A261D] tabular-nums">
                        {formatCurrencyBRL(item.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(item, e)}
                      aria-label={`Adicionar ${item.name}`}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : hasOptions
                          ? 'bg-[#F5ECE3] hover:bg-[#8C593B] text-[#5B3929] hover:text-white'
                          : 'bg-[#8C593B] hover:bg-[#72452B] active:scale-95 text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Adicionado!</span>
                        </>
                      ) : hasOptions ? (
                        <>
                          <span>Opções</span>
                          <Plus className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
