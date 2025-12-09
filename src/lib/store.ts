import { create } from 'zustand';
import { Product, CartItem, PromoCode } from './types';

interface StoreState {
  cart: CartItem[];
  appliedPromo: PromoCode | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (promo: PromoCode) => void;
  removePromoCode: () => void;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getDiscount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  appliedPromo: null,

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { product, quantity: 1 }],
      };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ cart: [], appliedPromo: null });
  },

  applyPromoCode: (promo) => {
    set({ appliedPromo: promo });
  },

  removePromoCode: () => {
    set({ appliedPromo: null });
  },

  getCartSubtotal: () => {
    const { cart } = get();
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getDiscount: () => {
    const { appliedPromo } = get();
    const subtotal = get().getCartSubtotal();

    if (!appliedPromo) return 0;

    if (appliedPromo.type === 'percentage') {
      return (subtotal * appliedPromo.discount) / 100;
    }

    return appliedPromo.discount;
  },

  getCartTotal: () => {
    const subtotal = get().getCartSubtotal();
    const discount = get().getDiscount();
    return Math.max(0, subtotal - discount);
  },
}));