import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { favoritesService, Favorite } from '../services/supabase';
import { useAuth } from './AuthContext';
import Toast from '../components/feature/Toast';

interface FavoritesContextType {
  favorites: Favorite[];
  favoritesCount: number;
  loading: boolean;
  addFavorite: (product: any) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: any) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const refreshFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    const { data, error } = await favoritesService.getFavorites(user.id);
    if (!error && data) {
      setFavorites(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshFavorites();
  }, [user]);

  const addFavorite = async (product: any) => {
    if (!user) {
      setToast({ message: 'Por favor, inicia sesión para añadir favoritos', type: 'info' });
      return;
    }

    const { error } = await favoritesService.addFavorite(user.id, product);
    if (error) {
      console.error('Error al añadir favorito:', error);
      setToast({ message: 'Error al añadir a favoritos', type: 'error' });
    } else {
      await refreshFavorites();
      setToast({ message: '❤️ Añadido a favoritos', type: 'success' });
    }
  };

  const removeFavorite = async (productId: string) => {
    if (!user) return;

    const { error } = await favoritesService.removeFavorite(user.id, productId);
    if (error) {
      console.error('Error al eliminar favorito:', error);
      setToast({ message: 'Error al eliminar de favoritos', type: 'error' });
    } else {
      await refreshFavorites();
      setToast({ message: 'Eliminado de favoritos', type: 'info' });
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some((fav) => fav.product_id === productId);
  };

  const toggleFavorite = async (product: any) => {
    if (isFavorite(product.id)) {
      await removeFavorite(product.id);
    } else {
      await addFavorite(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        loading,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        refreshFavorites,
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
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
  }
  return context;
}
