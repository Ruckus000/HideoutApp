/**
 * CartContext.js
 *
 * Global cart state management for the HideOut Kava App.
 * Provides cart operations, calculations, and persistence across the entire app.
 *
 * Key Responsibilities:
 * - Manage cart items (add, remove, update quantities)
 * - Calculate subtotals and totals
 * - Persist cart data to AsyncStorage for app restart persistence
 * - Provide cart state to all components via React Context
 *
 * Design Philosophy - Warm Minimalism:
 * - Clean, single-responsibility functions maintain code clarity
 * - Automatic persistence reduces user friction (cart survives app restarts)
 * - Comprehensive helper functions prevent calculation logic duplication
 * - Context pattern enables global state without prop drilling
 *
 * Used By:
 * - FloatingCartBar: Displays cart count and subtotal
 * - CartScreen: Shows full cart details and enables modifications
 * - CartTabBadge: Shows item count on tab bar
 * - Product screens: Add items to cart
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Cart Context
 *
 * React Context for sharing cart state across the component tree without
 * passing props through every level (prevents prop drilling).
 */
const CartContext = createContext();

/**
 * Cart Provider Component
 *
 * Wraps the app (or navigation tree) to provide cart state and operations
 * to all child components.
 *
 * State Management Strategy:
 * - Uses React useState for reactive cart items array
 * - Each cart item contains: id, name, price, quantity, options, cartItemId
 * - cartItemId is unique per cart entry (allows same product with different options)
 *
 * Persistence Strategy:
 * - Loads cart from AsyncStorage on mount
 * - Saves cart to AsyncStorage whenever cartItems changes
 * - Key: 'hideoutCart' - stored as JSON string
 */
export const CartProvider = ({ children }) => {
  /**
   * Cart Items State
   *
   * Array of cart items. Each item structure:
   * {
   *   id: string,           // Product ID
   *   name: string,         // Product name
   *   price: number,        // Unit price
   *   quantity: number,     // Quantity in cart
   *   options: object,      // Selected options (size, temperature, etc.)
   *   cartItemId: string,   // Unique cart entry ID (id + timestamp)
   *   image?: string,       // Optional product image
   *   description?: string  // Optional product description
   * }
   */
  const [cartItems, setCartItems] = useState([]);

  /**
   * Load Cart from AsyncStorage
   *
   * Runs once on component mount (empty dependency array).
   * Restores cart state from previous session, providing seamless UX.
   *
   * Why AsyncStorage?
   * - Persists cart between app sessions (even after app is closed)
   * - Native async storage is fast and reliable
   * - Simple key-value API fits our needs
   *
   * Error Handling:
   * - Catches and logs errors to prevent app crash
   * - If load fails, cart starts empty (graceful degradation)
   *
   * Design Philosophy:
   * - Automatic persistence reduces user friction
   * - Users don't lose their cart when closing the app
   * - Supports the "warm" user experience (app remembers your choices)
   */
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
  }, []); // Empty array = run once on mount

  /**
   * Save Cart to AsyncStorage
   *
   * Runs whenever cartItems changes (cartItems in dependency array).
   * Automatically persists cart state for session recovery.
   *
   * Why on every change?
   * - Ensures cart is always in sync with storage
   * - Prevents data loss if app crashes or is force-closed
   * - AsyncStorage is fast enough that this doesn't impact performance
   *
   * Optimization:
   * - Only saves if cartItems.length > 0 to avoid unnecessary writes
   * - When cart is cleared, we don't persist empty array
   *
   * Error Handling:
   * - Catches and logs errors to prevent UI disruption
   * - Cart state in memory remains valid even if save fails
   */
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('hideoutCart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to AsyncStorage:', error);
      }
    };
    // Only save if cart has items (optimization)
    if (cartItems.length > 0) {
      saveCart();
    }
  }, [cartItems]); // Dependency: runs whenever cartItems changes

  /**
   * Add Item to Cart
   *
   * Adds a product to the cart or updates quantity if it already exists.
   *
   * Smart Duplicate Detection:
   * - Checks if item with same ID AND same options already exists
   * - Uses JSON.stringify for deep comparison of options object
   * - Example: "Small Hot Kava" vs "Large Iced Kava" are different cart entries
   *
   * Two Scenarios:
   *
   * 1. Item exists (same id + options):
   *    - Increments quantity instead of creating duplicate entry
   *    - Maintains clean cart (one entry per unique product configuration)
   *
   * 2. Item is new:
   *    - Adds to cart with unique cartItemId
   *    - cartItemId = `${id}-${timestamp}` ensures uniqueness
   *    - Timestamp prevents collisions when adding same item multiple times
   *
   * Design Philosophy:
   * - Intelligent merging keeps cart clean and minimal
   * - Unique IDs enable granular cart item management
   * - Immutable state updates (spread operators) prevent React bugs
   *
   * @param {Object} item - Product to add with structure: { id, name, price, options, quantity? }
   */
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if item already exists with same options
      // Deep comparison of options via JSON.stringify
      const existingItemIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.options) === JSON.stringify(item.options)
      );

      if (existingItemIndex > -1) {
        // Item exists - increment quantity
        const updatedItems = [...prevItems]; // Immutable copy
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1),
        };
        return updatedItems;
      } else {
        // New item - add to cart with unique ID
        return [
          ...prevItems,
          {
            ...item,
            quantity: item.quantity || 1, // Default to 1 if not specified
            cartItemId: `${item.id}-${Date.now()}`, // Unique identifier
          },
        ];
      }
    });
  };

  /**
   * Remove Item from Cart
   *
   * Completely removes a cart item by its unique cartItemId.
   *
   * Why cartItemId instead of product id?
   * - Allows removing specific cart entries
   * - Same product with different options can coexist
   * - Example: Can remove "Small Kava" but keep "Large Kava"
   *
   * Implementation:
   * - Uses filter to create new array without the removed item
   * - Immutable operation triggers React re-render
   * - Filtered array automatically saved to AsyncStorage via useEffect
   *
   * @param {string} cartItemId - Unique cart entry ID to remove
   */
  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  /**
   * Update Item Quantity
   *
   * Changes the quantity of a specific cart item.
   *
   * Smart Quantity Handling:
   * - If newQuantity <= 0: Removes item from cart entirely
   * - If newQuantity > 0: Updates quantity in place
   *
   * Why auto-remove on zero?
   * - Prevents invalid cart state (items with 0 quantity)
   * - Matches user expectation (reducing to 0 = remove)
   * - Keeps cart clean and minimal
   *
   * Implementation:
   * - Uses map to create new array with updated item
   * - Only updates item matching cartItemId, others pass through unchanged
   * - Immutable update pattern ensures proper React rendering
   *
   * Use Cases:
   * - User taps +/- buttons on cart screen
   * - User manually enters quantity
   * - Quantity validation (max limits, stock availability)
   *
   * @param {string} cartItemId - Unique cart entry ID to update
   * @param {number} newQuantity - New quantity value (removes if <= 0)
   */
  const updateQuantity = (cartItemId, newQuantity) => {
    // Auto-remove if quantity reaches zero or below
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    // Update quantity for matching cart item
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  /**
   * Clear Entire Cart
   *
   * Removes all items from cart at once.
   *
   * Use Cases:
   * - After successful checkout/payment
   * - User explicitly clears cart
   * - Cart expiration (if implemented)
   * - Account logout (if desired)
   *
   * Side Effects:
   * - Triggers FloatingCartBar to animate out (cart becomes empty)
   * - Clears cart badge from tab bar
   * - Note: Empty cart is NOT saved to AsyncStorage (see saveCart useEffect condition)
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Calculate Subtotal
   *
   * Calculates the sum of all cart items (price × quantity) before any fees.
   *
   * Calculation Logic:
   * - Uses reduce to sum across all cart items
   * - Formula: Σ(item.price × item.quantity)
   * - Starts at 0 (accumulator initial value)
   *
   * Data Validation:
   * - parseFloat(price) || 0: Ensures valid number, defaults to 0
   * - parseInt(quantity) || 0: Ensures integer quantity, defaults to 0
   * - Prevents NaN errors from invalid data
   *
   * What's NOT included:
   * - Taxes (if applicable)
   * - Delivery fees
   * - Service charges
   * - Discounts/promo codes (if implemented)
   *
   * Use Cases:
   * - Display on CartScreen
   * - Display on FloatingCartBar
   * - Calculate total in checkout
   * - Calculate rewards points earned
   *
   * @returns {number} Subtotal in dollars
   */
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return total + (itemPrice * itemQuantity);
    }, 0);
  };

  /**
   * Calculate Total
   *
   * Calculates final order total including optional delivery charge.
   *
   * Calculation:
   * Total = Subtotal + Delivery Charge
   *
   * Parameters:
   * @param {number} deliveryCharge - Optional delivery fee (defaults to 0)
   *
   * Design Rationale:
   * - Delivery charge optional since pickup orders have no delivery fee
   * - Validates deliveryCharge via parseFloat to prevent errors
   * - Could be extended to include taxes, tips, or promo discounts
   *
   * Use Cases:
   * - Checkout screen final total
   * - Order confirmation
   * - Payment processing
   *
   * Future Extensions:
   * - Add tax calculation parameter
   * - Add discount/promo code parameter
   * - Add tip parameter
   *
   * @returns {number} Total order cost in dollars
   */
  const calculateTotal = (deliveryCharge = 0) => {
    const subtotal = calculateSubtotal();
    const delivery = parseFloat(deliveryCharge) || 0;
    return subtotal + delivery;
  };

  /**
   * Get Cart Count
   *
   * Returns total quantity of all items in cart (sum of quantities).
   *
   * Example:
   * Cart: [{ name: "Kava", quantity: 2 }, { name: "Tea", quantity: 3 }]
   * Result: 5 (total items)
   *
   * Calculation:
   * - Uses reduce to sum all item quantities
   * - Validates quantity with parseInt to prevent NaN
   *
   * Used By:
   * - CartTabBadge: Shows "5" on cart icon
   * - FloatingCartBar: Shows "5 Items"
   *
   * @returns {number} Total quantity of items across all cart entries
   */
  const getCartCount = () => {
    return cartItems.reduce((count, item) => {
      return count + (parseInt(item.quantity) || 0);
    }, 0);
  };

  /**
   * Get Unique Item Count
   *
   * Returns number of unique cart entries (not counting quantities).
   *
   * Example:
   * Cart: [{ name: "Kava", quantity: 2 }, { name: "Tea", quantity: 3 }]
   * Result: 2 (unique items)
   *
   * Implementation:
   * - Simply returns cartItems.length
   * - Each cart entry is unique (different id or options)
   *
   * Use Cases:
   * - Display "2 items in cart" type messages
   * - Differentiate between "items" vs "total quantity"
   *
   * @returns {number} Number of unique cart entries
   */
  const getUniqueItemCount = () => {
    return cartItems.length;
  };

  /**
   * Check if Cart is Empty
   *
   * Simple boolean check for cart emptiness.
   *
   * Used By:
   * - FloatingCartBar: Hide when cart is empty
   * - CartScreen: Show empty state vs cart list
   * - Checkout flow: Prevent checkout with empty cart
   *
   * @returns {boolean} true if cart has no items, false otherwise
   */
  const isCartEmpty = () => {
    return cartItems.length === 0;
  };

  /**
   * Find Cart Item
   *
   * Retrieves a specific cart item by its unique cartItemId.
   *
   * Use Cases:
   * - Look up item details for display
   * - Verify item exists before updating
   * - Get current quantity before incrementing
   *
   * @param {string} cartItemId - Unique cart entry ID to find
   * @returns {Object|undefined} Cart item object or undefined if not found
   */
  const findCartItem = (cartItemId) => {
    return cartItems.find((item) => item.cartItemId === cartItemId);
  };

  /**
   * Context Value
   *
   * Object containing all cart state and operations exposed to consumers.
   *
   * State:
   * - cartItems: Raw array of cart items
   * - cartCount: Total quantity (computed)
   * - uniqueItemCount: Number of unique entries (computed)
   * - isCartEmpty: Boolean empty check (computed)
   *
   * Operations:
   * - addToCart: Add/increment item
   * - removeFromCart: Remove item completely
   * - updateQuantity: Change item quantity
   * - clearCart: Remove all items
   *
   * Calculations:
   * - calculateSubtotal: Sum before fees
   * - calculateTotal: Sum with optional delivery fee
   *
   * Utilities:
   * - findCartItem: Look up specific item
   *
   * Why compute values here?
   * - cartCount, uniqueItemCount, isCartEmpty recalculate on every render
   * - Ensures values always reflect current cart state
   * - No stale data issues
   * - Alternative would be storing in state, but that's redundant
   */
  const value = {
    // State
    cartItems,
    cartCount: getCartCount(),
    uniqueItemCount: getUniqueItemCount(),
    isCartEmpty: isCartEmpty(),

    // Operations
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    // Calculations
    calculateSubtotal,
    calculateTotal,

    // Utilities
    findCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * useCart Hook
 *
 * Custom React hook for accessing cart context in components.
 *
 * Usage:
 * ```jsx
 * const { cartItems, addToCart, cartCount } = useCart();
 * ```
 *
 * Error Handling:
 * - Throws descriptive error if used outside CartProvider
 * - Prevents silent bugs from undefined context
 * - Guides developers to proper usage
 *
 * Why a custom hook?
 * - Cleaner syntax than useContext(CartContext)
 * - Built-in error checking
 * - Single import: useCart instead of CartContext + useContext
 *
 * Design Philosophy:
 * - Developer-friendly API maintains code clarity
 * - Fail-fast error prevents runtime bugs
 * - Follows React best practices for context consumption
 */
export const useCart = () => {
  const context = useContext(CartContext);

  // Validate context exists (component is within CartProvider)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export default CartContext;
