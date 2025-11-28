import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  google_id?: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image?: string;
  product_category?: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image?: string;
  product_category?: string;
  quantity: number;
  size?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

// Servicios de Autenticación
export const authService = {
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
  },
};

// Servicios de Favoritos
export const favoritesService = {
  async getFavorites(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async addFavorite(userId: string, product: any) {
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image,
        product_category: product.category,
      })
      .select()
      .single();
    return { data, error };
  },

  async removeFavorite(userId: string, productId: string) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    return { error };
  },

  async isFavorite(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();
    return { isFavorite: !!data, error };
  },
};

// Servicios de Carrito
export const cartService = {
  async getCartItems(userId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async addToCart(userId: string, product: any, quantity: number = 1, size?: string, color?: string) {
    // Verificar si el producto ya existe en el carrito
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', product.id)
      .eq('size', size || '')
      .eq('color', color || '')
      .single();

    if (existing) {
      // Actualizar cantidad
      const { data, error } = await supabase
        .from('cart_items')
        .update({ 
          quantity: existing.quantity + quantity,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();
      return { data, error };
    } else {
      // Insertar nuevo
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
          product_image: product.image,
          product_category: product.category,
          quantity,
          size,
          color,
        })
        .select()
        .single();
      return { data, error };
    }
  },

  async updateCartItem(itemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ 
        quantity,
        updated_at: new Date().toISOString(),
      })
      .eq('id', itemId)
      .select()
      .single();
    return { data, error };
  },

  async removeFromCart(itemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);
    return { error };
  },

  async clearCart(userId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    return { error };
  },
};

// Servicio de Newsletter
export const newsletterService = {
  async subscribe(email: string) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email })
      .select()
      .single();
    return { data, error };
  },
};
