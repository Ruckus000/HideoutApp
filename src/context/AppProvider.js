import React from 'react';
import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

/**
 * A top-level component that wraps the entire application, providing access to all
 * necessary contexts, such as the user and cart states.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} The rendered component with all context providers.
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
