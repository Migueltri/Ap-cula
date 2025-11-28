import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <AppRoutes />
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
