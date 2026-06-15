"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  menuId: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  restaurantName: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => boolean; // returns true if added, false if restaurant mismatch
  forceAddToCart: (item: Omit<CartItem, 'quantity'>) => void; // clears previous cart and adds item
  removeFromCart: (menuId: number) => void;
  updateQuantity: (menuId: number, quantity: number) => void;
  clearCart: () => void;
  restaurantId: number | null;
  restaurantName: string | null;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedRestId = localStorage.getItem('cart_restaurant_id');
    const savedRestName = localStorage.getItem('cart_restaurant_name');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedRestId) setRestaurantId(Number(savedRestId));
    if (savedRestName) setRestaurantName(savedRestName);
  }, []);

  // Save to localStorage whenever cart changes
  const saveCart = (items: CartItem[], restId: number | null, restName: string | null) => {
    setCartItems(items);
    setRestaurantId(restId);
    setRestaurantName(restName);
    localStorage.setItem('cart', JSON.stringify(items));
    if (restId !== null) {
      localStorage.setItem('cart_restaurant_id', String(restId));
    } else {
      localStorage.removeItem('cart_restaurant_id');
    }
    if (restName !== null) {
      localStorage.setItem('cart_restaurant_name', restName);
    } else {
      localStorage.removeItem('cart_restaurant_name');
    }
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'>): boolean => {
    // If cart is not empty and restaurantId is different, block and return false
    if (cartItems.length > 0 && restaurantId !== newItem.restaurantId) {
      return false;
    }

    const existingIndex = cartItems.findIndex(item => item.menuId === newItem.menuId);
    let updatedItems = [...cartItems];

    if (existingIndex > -1) {
      updatedItems[existingIndex].quantity += 1;
    } else {
      updatedItems.push({ ...newItem, quantity: 1 });
    }

    saveCart(updatedItems, newItem.restaurantId, newItem.restaurantName);
    return true;
  };

  const forceAddToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    const updatedItems = [{ ...newItem, quantity: 1 }];
    saveCart(updatedItems, newItem.restaurantId, newItem.restaurantName);
  };

  const removeFromCart = (menuId: number) => {
    const updatedItems = cartItems.filter(item => item.menuId !== menuId);
    if (updatedItems.length === 0) {
      saveCart([], null, null);
    } else {
      saveCart(updatedItems, restaurantId, restaurantName);
    }
  };

  const updateQuantity = (menuId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuId);
      return;
    }
    const updatedItems = cartItems.map(item =>
      item.menuId === menuId ? { ...item, quantity } : item
    );
    saveCart(updatedItems, restaurantId, restaurantName);
  };

  const clearCart = () => {
    saveCart([], null, null);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      forceAddToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      restaurantId,
      restaurantName,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
