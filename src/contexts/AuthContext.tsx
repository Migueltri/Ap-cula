import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/supabase';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión actual
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = authService.onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await authService.signInWithGoogle();
    if (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await authService.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
