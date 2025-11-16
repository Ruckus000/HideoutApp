import React from 'react';
import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

/**
 * AppProvider - Main context provider that wraps the entire application
 *
 * This component combines all global state providers (Cart and User contexts)
 * into a single wrapper component for cleaner app initialization.
 *
 * Usage:
 * Wrap your root App component with AppProvider in your index.js or App.js:
 *
 * import AppProvider from './context/AppProvider';
 *
 * function Root() {
 *   return (
 *     <AppProvider>
 *       <App />
 *     </AppProvider>
 *   );
 * }
 */

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </UserProvider>
  );
};

export default AppProvider;

// Re-export custom hooks for convenient imports
export { useCart } from './CartContext';
export { useUser } from './UserContext';

/**
 * Example usage in components:
 *
 * import { useCart, useUser } from '../context/AppProvider';
 *
 * function MyComponent() {
 *   const { cartItems, addToCart, cartCount } = useCart();
 *   const { user, updateProfile, addPoints } = useUser();
 *
 *   // Use the context values and functions
 *   return (
 *     <div>
 *       <p>Cart has {cartCount} items</p>
 *       <p>Welcome, {user.profile.name}!</p>
 *       <p>You have {user.rewards.points} points</p>
 *     </div>
 *   );
 * }
 */
