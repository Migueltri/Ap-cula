import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { cartService, CartItem } from '../services/supabase';
import { useAuth } from './AuthContext';
import Toast from '../components/feature/Toast';

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  loading: boolean;
  addToCart: (product: any, quantity?: number, size?: string, color?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const refreshCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    const { data, error } = await cartService.getCartItems(user.id);
    if (!error && data) {
      setCartItems(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (product: any, quantity: number = 1, size?: string, color?: string) => {
    if (!user) {
      setToast({ message: 'Por favor, inicia sesión para añadir al carrito', type: 'info' });
      return;
    }

    const { error } = await cartService.addToCart(user.id, product, quantity, size, color);
    if (error) {
      console.error('Error al añadir al carrito:', error);
      setToast({ message: 'Error al añadir al carrito', type: 'error' });
    } else {
      await refreshCart();
      setToast({ message: '🛒 Añadido al carrito', type: 'success' });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await cartService.updateCartItem(itemId, quantity);
    if (error) {
      console.error('Error al actualizar cantidad:', error);
      setToast({ message: 'Error al actualizar cantidad', type: 'error' });
    } else {
      await refreshCart();
    }
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await cartService.removeFromCart(itemId);
    if (error) {
      console.error('Error al eliminar del carrito:', error);
      setToast({ message: 'Error al eliminar del carrito', type: 'error' });
    } else {
      await refreshCart();
      setToast({ message: 'Producto eliminado del carrito', type: 'info' });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await cartService.clearCart(user.id);
    if (error) {
      console.error('Error al limpiar carrito:', error);
      setToast({ message: 'Error al limpiar el carrito', type: 'error' });
    } else {
      await refreshCart();
      setToast({ message: 'Carrito vaciado', type: 'info' });
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}
