/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BioHero } from './components/BioHero';
import { LeadTimeBanner } from './components/LeadTimeBanner';
import { MenuSection } from './components/MenuSection';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, FloatingCartButton } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { PixModal } from './components/PixModal';
import { Footer } from './components/Footer';
import { CartItem, MenuItem, ProductOption } from './types';

const STORAGE_CART_KEY = 'carol_gourmet_cart_v1';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isPixOpen, setIsPixOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // Storage unavailable fallback
    }
  }, [cart]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedOption?: ProductOption,
    observation?: string
  ) => {
    const optionName = selectedOption?.name;
    const finalPrice = selectedOption
      ? Math.max(0, item.price + selectedOption.priceDelta)
      : item.price;

    const cartItemId = `${item.id}-${optionName || 'standard'}-${(
      observation || ''
    ).trim()}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (ci) => ci.cartItemId === cartItemId
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        cartItemId,
        productId: item.id,
        name: item.name,
        price: finalPrice,
        quantity,
        selectedOption: optionName,
        observation: observation?.trim(),
        imageUrl: item.imageUrl,
      };

      return [...prevCart, newItem];
    });
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(item, 1);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((ci) =>
        ci.cartItemId === cartItemId ? { ...ci, quantity: newQty } : ci
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2420]">
      {/* Top Bar Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      <main className="flex-1">
        {/* BioSite Profile Hero with the 4 CTAs */}
        <BioHero
          onScrollToMenu={handleScrollToMenu}
          onOpenLocation={() => setIsLocationOpen(true)}
          onOpenPix={() => setIsPixOpen(true)}
        />

        {/* Lead time & clear instructions banner */}
        <LeadTimeBanner />

        {/* Interactive Digital Menu & Orders Showcase */}
        <MenuSection
          onSelectItem={(item) => setSelectedProduct(item)}
          onQuickAdd={handleQuickAdd}
        />
      </main>

      {/* Footer */}
      <Footer onOpenLocation={() => setIsLocationOpen(true)} />

      {/* Floating Bottom Cart Bar (if items in cart and drawer closed) */}
      {!isCartOpen && (
        <FloatingCartButton
          count={totalCartCount}
          total={totalCartPrice}
          onOpen={() => setIsCartOpen(true)}
        />
      )}

      {/* Product Customization Modal */}
      <ProductModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Sliding Order Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Location & Directions Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />

      {/* Quick PIX Modal */}
      <PixModal isOpen={isPixOpen} onClose={() => setIsPixOpen(false)} />
    </div>
  );
}
