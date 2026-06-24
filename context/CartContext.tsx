"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartItem = any;
const CartContext = createContext<any>(null);
const CART_STORAGE_KEY = "sandys-trendy-wear-cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem(CART_STORAGE_KEY)
        : null;
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, selectedOptions: any = {}) => {
    setCart((current) => {
      const idx = current.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === selectedOptions.size &&
          item.color === selectedOptions.color,
      );
      if (idx >= 0) {
        const next = [...current];
        next[idx].quantity += selectedOptions.quantity || 1;
        return next;
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.discountPrice || product.price,
          image: product.images[0],
          size: selectedOptions.size || product.sizes?.[0] || "One size",
          color: selectedOptions.color || product.colors?.[0] || "Default",
          quantity: selectedOptions.quantity || 1,
        },
      ];
    });
  };

  const updateQuantity = (
    id: number,
    size: string,
    color: string,
    quantity: number,
  ) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: Math.max(1, quantity) }
            : item,
        )
        .filter((i: any) => i.quantity > 0),
    );
  };

  const removeFromCart = (id: number, size: string, color: string) =>
    setCart((current) =>
      current.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color),
      ),
    );
  const clearCart = () => setCart([]);

  const summary = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = cart.length ? 10 : 0;
    return { subtotal, shipping, total: subtotal + shipping };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        summary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
