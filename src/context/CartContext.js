import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  // Initialize cart state
  const [cartItems, setCartItems] = useState([]);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('hideoutCart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart from AsyncStorage:', error);
      }
    };
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('hideoutCart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to AsyncStorage:', error);
      }
    };
    if (cartItems.length > 0) {
      saveCart();
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.options) === JSON.stringify(item.options)
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1),
        };
        return updatedItems;
      } else {
        // Add new item to cart
        return [
          ...prevItems,
          {
            ...item,
            quantity: item.quantity || 1,
            cartItemId: `${item.id}-${Date.now()}`, // Unique identifier for cart item
          },
        ];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  // Update item quantity
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate subtotal (sum of all items before taxes/fees)
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return total + itemPrice * itemQuantity;
    }, 0);
  };

  // Calculate total (includes delivery charge if applicable)
  const calculateTotal = (deliveryCharge = 0) => {
    const subtotal = calculateSubtotal();
    const delivery = parseFloat(deliveryCharge) || 0;
    return subtotal + delivery;
  };

  // Get cart item count (total number of items)
  const getCartCount = () => {
    return cartItems.reduce((count, item) => {
      return count + (parseInt(item.quantity) || 0);
    }, 0);
  };

  // Get cart item count (unique items)
  const getUniqueItemCount = () => {
    return cartItems.length;
  };

  // Check if cart is empty
  const isCartEmpty = () => {
    return cartItems.length === 0;
  };

  // Find item in cart
  const findCartItem = (cartItemId) => {
    return cartItems.find((item) => item.cartItemId === cartItemId);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateSubtotal,
    calculateTotal,
    cartCount: getCartCount(),
    uniqueItemCount: getUniqueItemCount(),
    isCartEmpty: isCartEmpty(),
    findCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
